import { v4 as uuid } from "uuid";
import { client } from "../db/PostgresConection";
import { Pet } from "../models/Pet";
import { petAdoptedEmail } from "../services/AutomateEmailer";
import { bucket } from "../services/Firebase";

class PetRepository {
  // add new pet post to db
  async newPet(pet: Pet) {
    const petId = uuid();
    const { image } = pet;

    if (image.size >= 4 * 1024 * 1024) {
      throw new Error(
        "Could not add pet: Image size should be smaller than 4MiB"
      );
    }

    const query = {
      text:
        "INSERT INTO pets(petid, donatorid, ownerid," +
        "petname, city, sstate, age, medicalcondition, pettype, isadopted) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
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
      ],
    };

    await client.query(query);

    const { imagebuf } = pet;
    if (imagebuf) {
      if (imagebuf.byteLength >= 4 * 1024 * 1024) {
        throw new Error(
          "Could not add pet: Image size should be smaller than 4MiB"
        );
      }

      await bucket.file(`pets/${petId}`).save(imagebuf);
    }

    return {
      status: "success",
      message: "Pet added to db",
      petId: petId,
    };
  }

  // change isAdopted status of pet
  async adoptPet(petId: string, newOwnerId: string) {
    const query = {
      text: "UPDATE pets SET ownerid = $1, isadopted = $2 WHERE petid = $3",
      values: [newOwnerId, true, petId],
    };

    await client.query(query);
    await petAdoptedEmail(newOwnerId, petId);

    return {
      status: "success",
      message: "Pet adopted",
    };
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
    const query = {
      text: "SELECT * FROM pets WHERE petid = $1",
      values: [id],
    };

    const res = await client.query(query);
    const pet = res.rows[0];

    pet.imageURL = null;

    const file = bucket.file(`pets/${id}`);
    const exists = (await file.exists())[0];
    if (exists) pet.imageURL = file.publicUrl();

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
    const query = {
      text: "SELECT * FROM pets WHERE pettype =$1 and isadopted = false",
      values: [petType],
    };

    const res = await client.query(query);
    return res.rows;
  }

  async getPetDownloadURL(id: string) {
    const file = bucket.file(`pets/${id}`);
    const exists = (await file.exists())[0];
    return exists ? file.publicUrl() : null;
  }
}

export { PetRepository };
