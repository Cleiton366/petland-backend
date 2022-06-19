import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";

const userRepository = new UserRepository();

class UserController {
  async getUser(req: Request, res: Response) {
    const { user } = req;
    return await userRepository.getUser(user.toString());
  }

  async newUser(req: Request, res: Response) {
    const user = req;
    return await userRepository.newUser(user);
  }

  async verifyUser(id: string) {
    return await userRepository.getUser(id);
  }

  async getDonatedPets(req: Request, res: Response) {
    const userid = req.headers.userid;
    try {
      const donatedPetsList = await userRepository.getDonatedPets(
        userid.toString()
      );
      return res.json(donatedPetsList);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async getUserPets(req: Request, res: Response) {
    const userid = req.headers.userid;
    try {
      const donatedPetsList = await userRepository.getUserPets(
        userid.toString()
      );
      return res.json(donatedPetsList);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

export { UserController };
