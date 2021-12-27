import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";

const userRepository = new UserRepository();

class UserController {
  
  async getUser(req: Request, res: Response) {
    const id = req;
    const user = await userRepository.getUser(id);
    return user;
  }

  async newUser(req: Request, res: Response) {
    const user = req;
    await userRepository.newUser(user);
    return user;
  }
  
}

export { UserController };
