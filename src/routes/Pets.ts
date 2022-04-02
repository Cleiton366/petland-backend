import { Router } from "express";
import { PetController } from "../controllers/PetController";
import { check_api_key } from "../middleware/check_api_key";

const petController = new PetController();
const router = Router();

//////////////////pet routes////////////////////////

// add new pet to db
router.post("/newpet", check_api_key, petController.newPet);

// change isAdopted status of pet
router.put("/adoptpet", check_api_key, petController.adoptPet);

//delete pet
router.delete("/deletepet", check_api_key, petController.deletePet);

//get pet pet info
router.get("/getPet/:petId", check_api_key, petController.getPet);

//get a list of pets by pet type
router.get("/petlist", check_api_key, petController.getPetList);

//get all adopted pets list
router.get("/adoptedlist", check_api_key, petController.getAdoptedPetsList);

//get all pets donated list
router.get("/donatedlist", check_api_key, petController.getDonatedPetsList);

export { router };