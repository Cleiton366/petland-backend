import { PetRepository } from "../repositories/PetRepository";
import { Request, Response } from "express";

const petRepository = new PetRepository();

class PetController {
  // add new pet post to db
  async newPet(req: Request, res: Response) {
    const pet= req.body;
    await petRepository.newPet(pet);
  }
  // change isAdopted status of pet
  async adoptPet(req: Request, res: Response) {
    const { pet_id, userId } = req.body;
    await petRepository.adoptPet(pet_id, userId);
  }
  //delete adoption post
  async deletePet(req: Request, res: Response) {
    const { pet_id } = req.body;
    await petRepository.deletePet(pet_id);
  }
  //get pet adoption info
  async getPet(req: Request, res: Response) {
    const { pet_id } = req.body;
    const pet = await petRepository.getPet(pet_id);
    return res.json(pet);
  }
  //get all cat list
  async getCatList(req: Request, res: Response) {
    const {city, state} = req.body;
    const catList = await petRepository.getCatList(city, state);
    return res.json(catList);
  }
  //get all dog list
  async getDogList(req: Request, res: Response) {
    const {city, state} = req.body;
    const dogList = await petRepository.getDogList(city, state);
    return res.json(dogList);
  }
  //get all adopted pets list
  async getAdoptedPetsList(req: Request, res: Response) {
    const userId = req.body;
    const adoptedPetsList = await petRepository.getUserAdoptedPetsList(userId);
    return res.json(adoptedPetsList);
  }
  //get all pets donated list
  async getDonatedPetsList(req: Request, res: Response) {
    const userId = req.body;
    const donatedPetsList = await petRepository.getUserDonatedPetsList(userId);
    return res.json(donatedPetsList);
  }
}

export { PetController };
