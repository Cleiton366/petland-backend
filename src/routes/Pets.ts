import { Router } from "express";
import { PetController } from "../controllers/PetController";
import { check_api_key } from "../middleware/check_api_key";

const petController = new PetController();
const router = Router();

//////////////////pet routes////////////////////////

// add new pet to db
router.post("/pet/new", check_api_key, petController.newPet);

// change isAdopted status of pet
router.put("/pet/adopt", check_api_key, petController.adoptPet);

//delete pet
router.delete("/pet/delete", check_api_key, petController.deletePet);

//get pet pet info
router.get("/pet/:petId", check_api_key, petController.getPet);

//get a list of pets by pet type
router.get("/pet/list", check_api_key, petController.getPetList);

export { router };