import { Router } from "express";
import { PetController } from "../controllers/PetController";
import { CheckSession } from "../middleware/CheckSession";
import cookieSession from "cookie-session";
import passport from "passport";

const petController = new PetController();
const router = Router();

router.use(
    cookieSession({
      name: "session",
      keys: ["key1", "key2"],
      maxAge: 60 * 60 * 1000, // 1 hour
    })
  );
  
// Initializes passport and passport sessions
router.use(passport.initialize());
router.use(passport.session());

//////////////////pet routes////////////////////////

// add new pet to db
router.post("/pet/new", CheckSession, petController.newPet);

// change isAdopted status of pet
router.put("/pet/adopt", CheckSession, petController.adoptPet);

//delete pet
router.delete("/pet/delete", CheckSession, petController.deletePet);

//get pet pet info
router.get("/pet/:petId", CheckSession, petController.getPet);

//get a list of pets by pet type
router.get("/pet/:petType/list", CheckSession, petController.getPetList);

//get a list of all pets by pet type
router.get("/pet/:petType/all", CheckSession, petController.getPetAll);

export { router };