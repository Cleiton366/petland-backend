import { Router } from "express";
import { PetController } from "../controllers/PetController";
import { CheckSession } from "../middleware/CheckSession";

const petController = new PetController();
const router = Router();

//////////////////pet routes////////////////////////

// add new pet to db
router.post("/pet/new", CheckSession, petController.newPet);

//delete pet
router.delete("/pet/delete", CheckSession, petController.deletePet);

//get pet pet info
router.get("/pet/:petId", CheckSession, petController.getPet);

//get a list of pets by pet type
router.get("/pet/:petType/list", CheckSession, petController.getPetList);

//get a list of all pets by pet type
router.get("/pet/:petType/all", CheckSession, petController.getPetAll);

//get a list of all pets by pet type
router.get("/pet/:petId/image", CheckSession, petController.getPetDownloadURL);

export { router };
