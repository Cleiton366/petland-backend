import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";

const userRepository = new UserRepository();

class UserController {
  async getUser(req: Request, res: Response) {
    const { user } = req;
    const result = await userRepository.getUser(user);
    return result;
  }

  async newUser(req: Request, res: Response) {
    const user = req;
    await userRepository.newUser(user);
    return user;
  }

  async verifyUser(id) {
    const result = await userRepository.getUser(id);
    return result;
  }
}

export { UserController };
