import { Router } from "express";
import { PetController } from "../controllers/PetController";

const petController = new PetController();
const router = Router();

//////////////////pet routes////////////////////////

// add new pet to db
router.post("/newpet", petController.newPet);

// change isAdopted status of pet
router.put("/adoptpet", petController.adoptPet);

//delete pet
router.delete("/deletepet", petController.deletePet);

//get pet pet info
router.get("/getPet/:petId", petController.getPet);

//get a list of pets by pet type
router.get("/petlist", petController.getPetList);

//get all adopted pets list
router.get("/adoptedlist", petController.getAdoptedPetsList);

//get all pets donated list
router.get("/donatedlist", petController.getDonatedPetsList);

export { router };