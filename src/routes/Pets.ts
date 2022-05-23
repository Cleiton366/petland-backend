import { Router } from "express";
import { PetController } from "../controllers/PetController";

const petController = new PetController();
const router = Router();

//////////////////pet routes////////////////////////

// add new pet to db
router.post("/pet/new", petController.newPet);

// change isAdopted status of pet
router.put("/pet/adopt", petController.adoptPet);

//delete pet
router.delete("/pet/delete", petController.deletePet);

//get pet pet info
router.get("/pet/:petId", petController.getPet);

//get a list of pets by pet type
router.get("/pet/:petType/list", petController.getPetList);

export { router };