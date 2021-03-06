import { PetRepository } from "../repositories/PetRepository";
import { Request, Response } from "express";
import multer from "multer";
import util from "util";

const upload = multer({ storage: multer.memoryStorage() });

const petRepository = new PetRepository();

class PetController {
  // add new pet post to db
  async newPet(req: any, res: Response, next) {
    try {
      const uploadSingle = util.promisify(upload.single("image"));
      await uploadSingle(req, res);

      const pet = JSON.parse(req.body.pet);

      const { file } = req;

      pet.imagebuf = file ? Buffer.from(file.buffer, file.encoding) : null;

      const result = await petRepository.newPet(pet);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  //delete adoption post
  async deletePet(req: Request, res: Response) {
    const { petId } = req.body;
    try {
      const result = await petRepository.deletePet(petId);
      return res.json(result);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  //get pet adoption info
  async getPet(req: Request, res: Response) {
    const { petId } = req.params;
    try {
      const pet = await petRepository.getPet(petId);
      return res.json(pet);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  ///get a list of pets by pet type
  async getPetList(req: Request, res: Response) {
    const { city, state } = req.query;
    const { petType } = req.params;
    try {
      const petList = await petRepository.getPetList(
        city.toString(),
        state.toString(),
        petType.toString()
      );
      return res.json(petList);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  ///get a list of all pets by pet type
  async getPetAll(req: Request, res: Response) {
    const { petType } = req.params;
    try {
      const petList = await petRepository.getPetAll(petType.toString());
      return res.json(petList);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  ///get a list of all pets by pet type
  async getPetDownloadURL(req: Request, res: Response) {
    const { petId } = req.params;
    try {
      const downloadURL = await petRepository.getPetDownloadURL(
        petId.toString()
      );
      return res.json({ downloadURL });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export { PetController };
