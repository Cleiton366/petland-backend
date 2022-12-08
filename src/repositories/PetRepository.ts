import { v4 as uuid } from "uuid";
import { client } from "../db/PostgresConection";
import { Pet } from "../models/Pet";
import { UserRepository } from "../repositories/UserRepository";
import { petAdoptedEmail } from "../services/AutomateEmailer";
import { bucket } from "../services/Firebase";

class PetRepository {
  // add new pet post to db
  async newPet(pet) {
    const petId = uuid();
    const petPhoto = await this.savePetImage(petId, pet.imagebuf);

    const query = {
      text:
        "INSERT INTO pets(petid, donatorid, ownerid," +
        "petname, city, sstate, age, medicalcondition, pettype, isadopted, petPhoto, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      values: [
        petId,
        pet.donatorId,
        "null",
        pet.petName,
        pet.petAddress.city,
        pet.petAddress.state,
        pet.age,
        pet.medicalCondition,
        pet.petType,
        false,
        petPhoto,
        pet.petAddress.address
      ],
    };

    await client.query(query);

    return {
      status: "success",
      message: "Pet added to db",
      petId: petId,
    };
  }

  async savePetImage(id: string, imagebuf: Buffer) {
    if (imagebuf.byteLength >= 4 * 1024 * 1024) {
      throw new Error("Could not add pet: Image size should be smaller than 4MiB");
    }

    await bucket.file(`pets/${id}`).save(imagebuf);

    const file = bucket.file(`pets/${id}`);
    const exists = (await file.exists())[0];
    const imageURL = exists ? file.publicUrl() : null;

    return imageURL;
  }
  //delete adoption post
  async deletePet(id: string) {
    const query = {
      text: "DELETE FROM pets WHERE petid = $1",
      values: [id],
    };

    await client.query(query);

    const file = bucket.file(`pets/${id}`);
    const exists = (await file.exists())[0];
    if (exists) await file.delete();

    return {
      status: "success",
      message: "Pet deleted from db",
    };
  }

  //get pet adoption info
  async getPet(id: string) {
    const userRepository = new UserRepository();
    const query = {
      text: "SELECT * FROM pets WHERE petid = $1",
      values: [id],
    };

    const res = await client.query(query);
    const pet = res.rows[0];

    pet.donatorInfo = await userRepository.getUser(pet.donatorid);
    return pet;
  }

  //get a list of pets by pet type
  async getPetList(city: string, state: string, petType: string) {
    const query = {
      text: "SELECT * FROM pets WHERE city = $1 and sstate = $2 and pettype =$3 and isadopted = false",
      values: [city, state, petType],
    };

    const res = await client.query(query);
    return res.rows;
  }

  //get a list of all pets by pet type
  async getPetAll(petType: string) {
    const userRepository = new UserRepository();
    const query = {
      text: "SELECT * FROM pets WHERE pettype =$1 and isadopted = false",
      values: [petType],
    };

    const res = await client.query(query);
    const petsList = res.rows

    for(var i = 0; i < petsList.length; i++) {
      var donatorid = petsList[i].donatorid
      petsList[i].donatorInfo = await userRepository.getUser(donatorid);
    }

    
    return petsList;
  }

  async getPetDownloadURL(id: string) {
    const file = bucket.file(`pets/${id}`);
    const exists = (await file.exists())[0];
    return exists ? file.publicUrl() : null;
  }
}

export { PetRepository };
