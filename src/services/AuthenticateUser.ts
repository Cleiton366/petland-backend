import { UserController } from "../controllers/UserController";
import { Request, Response } from "express";

const userController = new UserController();

export async function authenticateUser(req: Request, res: Response) {
  const user = await userController.getUser(req, res);
  if(user) {
      return user;
  }else {
      return null;
  }
}
