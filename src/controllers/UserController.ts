import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";

const userRepository = new UserRepository();

class UserController {
  async getUser(req: Request, res: Response) {
    const { user } = req;
    const result = await userRepository.getUser(user.toString());
    return result;
  }

  async newUser(req: Request, res: Response) {
    const user = req;
    const result = await userRepository.newUser(user);
    return result;
  }

  async verifyUser(id: string) {
    const result = await userRepository.getUser(id);
    return result;
  }

  async getDonatedPets(req: Request, res: Response) {
    const userid = req.headers.userid;
    const donatedPetsList = await userRepository.getDonatedPets(userid.toString());
    return res.json(donatedPetsList);
  }

  async getUserPets(req: Request, res: Response) {
    const userid = req.headers.userid;
    const donatedPetsList = await userRepository.getUserPets(userid.toString());
    return res.json(donatedPetsList);
  }
}

export { UserController };
