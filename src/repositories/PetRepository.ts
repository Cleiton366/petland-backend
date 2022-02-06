import { v4 as uuid } from 'uuid';
import { client } from "../db/PostgresConection";
import { Pet } from "../models/Pet";

class PetRepository {
  // add new pet post to db
  async newPet(pet: Pet) {
    const query = {
      text: "INSERT INTO pets(petid, donatorid, ownerid," 
        +"petname, city, sstate, age, medicalcondition, pettype, isadopted) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      values: [
        uuid(),
        pet.donatorId,
        pet.ownerId,
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
      status: "200",
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

    return {
      status: "200",
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
      status: "200",
      message: "Pet deleted from db"
    }
  }
  //get pet adoption info
  async getPet(id : string) {
      const query = {
        text: "SELECT * FROM pets WHERE petid = $1",
        values: [id],
      }
      let pet;
      await client.query(query).then((res) => {
        pet = res.rows[0];
      });
      return pet;
  }
  //get a list of pets by pet type
  async getPetList(city : string, state : string, petType : string) {
    const query = {
      text: "SELECT * FROM pets WHERE city = $1 and sstate = $2 and pettype =$3",
      values: [city, state, petType],
    }
    var petList = [];
    client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to get cat list on db", err.stack);
      } else {
        for(let i = 0; i < res.rows.length; i++) {
          petList.push(res.rows[i]);
        }
      }
    });
    return petList;
  }
  //get all adopted pets list
  async getUserAdoptedPetsList(userId : string) {
    const query = {
      text: "SELECT * FROM pets WHERE ownerid = $1",
      values: [userId],
    }
    let petList = [];
    client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to get cat list on db", err.stack);
      } else {
        for(let i = 0; i < res.rows.length; i++) {
          petList.push(res.rows[i]);
        }
      }
    });
    return petList;
  }
  //get all pets donated list
  async getUserDonatedPetsList(userId : string) {
    const query = {
      text: "SELECT * FROM pets WHERE donatorid = $1",
      values: [userId],
    }
    let petList = [];
    client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to get cat list on db", err.stack);
      } else {
        for(let i = 0; i < res.rows.length; i++) {
          petList.push(res.rows[i]);
        }
      }
    });
    return petList;
  }
}

export { PetRepository };
