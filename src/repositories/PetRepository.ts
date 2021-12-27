import { v4 as uuid } from 'uuid';
import { client } from "../db/PostgresConection";

type Pet = {
  petId: string;
  donatorId: string;
  ownerId: string;
  petName: string;
  petAddress: {
      city: string;
      state: string;
  }
  age: number;
  medicalCondition: string;
  petType: string;
  isAdopted: boolean;
}

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
        console.log("error while trying to save user on db", err.stack);
      } else {
        console.log("pet saved on db suscessfully");
      }
    });
  }
  // change isAdopted status of pet
  async adoptPet(pet_id, new_owner_id) {
    const query = {
      text: "UPDATE pets SET ownerid = $1, isadopted = $2 WHERE petid = $3",
      values: [new_owner_id, true, pet_id],
    }
    await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to update pet on db", err.stack);
      } else {
        console.log("pet updated on db suscessfully");
      }
    });
  }
  //delete adoption post
  deletePet(pet_id) {
    const query = {
      text: "DELETE FROM pets WHERE petid = $1",
      values: [pet_id],
    }
    client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to delete pet on db", err.stack);
      } else {
        console.log("pet deleted on db suscessfully");
      }
    });
  }
  //get pet adoption info
  async getPet(pet_id) {
      const query = {
        text: "SELECT * FROM pets WHERE petid = $1",
        values: [pet_id],
      }
      let pet;
      await client.query(query).then((res) => {
        pet = res.rows[0];
      });
      return pet;
  }
  //get all cat list
  async getCatList(city, state) {
    const query = {
      text: "SELECT * FROM pets WHERE city = $1 and sstate = $2 and pettype =$3",
      values: [city, state, "cat"],
    }
    let petList = [];
    await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to get cat list on db", err.stack);
      } else {
        for(let i = 0; i < res.rows.length; i++) {
          petList.push(res.rows[i]);
        }
        console.log("Cat List:", () => {
          petList.forEach(element => {
            console.log(element);
          });
        });
      }
    });
    return petList;
  }
  //get all dog list
  async getDogList(city, state) {
    const query = {
      text: "SELECT * FROM pets WHERE city = $1 and sstate = $2 and pettype =$3",
      values: [city, state, "dog"],
    }
    let petList = [];
    await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to get cat list on db", err.stack);
      } else {
        for(let i = 0; i < res.rows.length; i++) {
          petList.push(res.rows[i]);
        }
        console.log("Dog List:", () => {
          petList.forEach(element => {
            console.log(element);
          });
        });
      }
    });
    return petList;
  }
  //get all adopted pets list
  async getUserAdoptedPetsList(userId) {
    const query = {
      text: "SELECT * FROM pets WHERE ownerid = $1",
      values: [userId],
    }
    let petList = [];
    await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to get cat list on db", err.stack);
      } else {
        for(let i = 0; i < res.rows.length; i++) {
          petList.push(res.rows[i]);
        }
        console.log("Adopted Pets List:", () => {
          petList.forEach(element => {
            console.log(element);
          });
        });
      }
    });
    return petList;
  }
  //get all pets donated list
  async getUserDonatedPetsList(userId) {
    const query = {
      text: "SELECT * FROM pets WHERE donatorid = $1",
      values: [userId],
    }
    let petList = [];
    await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to get cat list on db", err.stack);
      } else {
        for(let i = 0; i < res.rows.length; i++) {
          petList.push(res.rows[i]);
        }
        console.log("Donated Pets List:", () => {
          petList.forEach(element => {
            console.log(element);
          });
        });
      }
    });
    return petList;
  }
}

export { PetRepository };
