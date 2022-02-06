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
    const { city, state, petType } = req.query;
    const catList = await petRepository.getPetList(city.toString(), state.toString(), petType.toString());
    return res.json(catList);
  }
 
  //get all adopted pets list
  async getAdoptedPetsList(req: Request, res: Response) {
    const userId = req.query.toString();
    const adoptedPetsList = await petRepository.getUserAdoptedPetsList(userId);
    return res.json(adoptedPetsList);
  }
  //get all pets donated list
  async getDonatedPetsList(req: Request, res: Response) {
    const userId = req.query.toString();
    const donatedPetsList = await petRepository.getUserDonatedPetsList(userId);
    return res.json(donatedPetsList);
  }
}

export { PetController };
