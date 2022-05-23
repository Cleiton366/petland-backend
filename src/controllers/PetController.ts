import { PetRepository } from "../repositories/PetRepository";
import { Request, Response } from "express";

const petRepository = new PetRepository();

class PetController {
  // add new pet post to db
  async newPet(req: Request, res: Response) {
    const { pet } = req.body;
    const result = await petRepository.newPet(pet);
    res.json(result);
  }
  // change isAdopted status of pet
  async adoptPet(req: Request, res: Response) {
    const { petId, newOwnerId } = req.body;
    const result = await petRepository.adoptPet(petId, newOwnerId);
    res.json(result);
  }
  //delete adoption post
  async deletePet(req: Request, res: Response) {
    const { petId } = req.body;
    const result = await petRepository.deletePet(petId);
    res.json(result);
  }
  //get pet adoption info
  async getPet(req: Request, res: Response) {
    const { petId } = req.params;
    const pet = await petRepository.getPet(petId);
    return res.json(pet);
  }
  ///get a list of pets by pet type
  async getPetList(req: Request, res: Response) {
    const { city, state } = req.query;
    const { petType } = req.params;
    //console.log(req.headers.cookie);
    console.log(req["session"]);
    const catList = await petRepository.getPetList(
      city.toString(),
      state.toString(),
      petType.toString()
    );
    return res.json(catList);
  }

}

export { PetController };
