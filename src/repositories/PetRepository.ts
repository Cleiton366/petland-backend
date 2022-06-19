import { v4 as uuid } from "uuid";
import { client } from "../db/PostgresConection";
import { Pet } from "../models/Pet";
import { petAdoptedEmail } from "../services/AutomateEmailer";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../services/Firebase";

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

    const imageRef = ref(storage, `pets/${petId}`);
    await uploadBytes(imageRef, image);

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
  async deletePet(pet_id: string) {
    const query = {
      text: "DELETE FROM pets WHERE petid = $1",
      values: [pet_id],
    };

    await client.query(query);

    const imageRef = ref(storage, `pets/${pet_id}`);
    await deleteObject(imageRef);

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

    const imageRef = ref(storage, `pets/${pet.petid}`);
    pet.imageURL = await getDownloadURL(imageRef);

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
    const imageRef = ref(storage, `pets/${id}`);
    return await getDownloadURL(imageRef);
  }
}

export { PetRepository };
