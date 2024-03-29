import { UserRepository } from "../repositories/UserRepository";
import { Request, Response } from "express";

const userRepository = new UserRepository();

class UserController {
  async getUser(req: Request, res: Response) {
    let { user } = req;
    if(!user) {
      user = req.headers.user.toString();
    }
    return await userRepository.getUser(user.toString());
  }

  async userInfo(req: Request, res: Response) {
      var { userid } = req.headers
      try {
          const user = await userRepository.getUser(userid.toString());
          return res.status(200).json(user)
      } catch (error) {
        res.status(500).json(error)
      }
  }

  async newUser(req: Request, res: Response) {
    const user = req;
    return await userRepository.newUser(user);
  }

  async newUserAndroid(req: Request, res: Response) {
    try {
      const { avatarurl, email, id , username } = req.body;
      return await userRepository.newUserAndroid(id, username, email, avatarurl);
    } catch (error) {
      throw new Error(error);
    }
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
