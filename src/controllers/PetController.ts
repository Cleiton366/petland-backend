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
    const petList = await petRepository.getPetList(
      city.toString(),
      state.toString(),
      petType.toString()
    );
    return res.json(petList);
  }

  ///get a list of all pets by pet type
  async getPetAll(req: Request, res: Response) {
    const { petType } = req.params;
    const petList = await petRepository.getPetAll(
      petType.toString()
    );
    return res.json(petList);
  }

}

export { PetController };
