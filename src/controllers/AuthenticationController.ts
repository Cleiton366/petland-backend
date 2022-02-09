import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";

const userRepository = new UserRepository();

class AuthenticationController {
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
}

export { AuthenticationController };
