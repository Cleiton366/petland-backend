import { v4 as uuid } from 'uuid';
import { client } from "../db/PostgresConection";
import { Pet } from "../models/Pet";
import { petAdoptedEmail } from "../services/AutomateEmailer";


class PetRepository {
  // add new pet post to db
  async newPet(pet: Pet) {
    const query = {
      text: "INSERT INTO pets(petid, donatorid, ownerid," 
        +"petname, city, sstate, age, medicalcondition, pettype, isadopted) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      values: [
        uuid(),
        pet.donatorId,
        "null",
        pet.petName,
        pet.petAddress.city,
        pet.petAddress.state,
        pet.age,
        pet.medicalCondition,
        pet.petType,
        false
      ],
    };
    await client.query(query, (err, res) => {
      if (err) {
        return err;
      }
    });

    return {
      status: "success",
      message: "Pet added to db"
    }
  }
  // change isAdopted status of pet
  async adoptPet(petId : string, newOwnerId : string) {
    const query = {
      text: "UPDATE pets SET ownerid = $1, isadopted = $2 WHERE petid = $3",
      values: [newOwnerId, true, petId]
    }
    await client.query(query, (err, res) => {
      if (err) {
        return err;
      }
    });

    petAdoptedEmail(newOwnerId, petId);

    return {
      status: "success",
      message: "Pet adopted"
    }
  }
  //delete adoption post
  async deletePet(pet_id : string) {
    const query = {
      text: "DELETE FROM pets WHERE petid = $1",
      values: [pet_id],
    }
    client.query(query, (err, res) => {
      if (err) {
        return err;
      }
    });

    return {
      status: "success",
      message: "Pet deleted from db"
    }
  }
  //get pet adoption info
  async getPet(id : string) {
      const query = {
        text: "SELECT * FROM pets WHERE petid = $1",
        values: [id],
      }
      const pet = client
      .query(query)
      .then(res => {
        return res.rows[0];
      })
      .catch(e => console.error(e.stack));
      return pet;
  }
  //get a list of pets by pet type
  async getPetList(city : string, state : string, petType : string) {
    const query = {
      text: "SELECT * FROM pets WHERE city = $1 and sstate = $2 and pettype =$3 and isadopted = false",
      values: [city, state, petType],
    }
    const petList = client
      .query(query)
      .then(res => {
        return res.rows;
      })
      .catch(e => console.error(e.stack));
      return petList;
  }
}

export { PetRepository };
