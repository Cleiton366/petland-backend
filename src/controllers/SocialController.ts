import { Request, Response } from "express";
import { SocialRepository } from "../repositories/SocialRepository";

const socialRepository = new SocialRepository();

class SocialController {
    async getSocial (req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const result = await socialRepository.getSocial(userId);
            return res.json(result);
        } catch (err) { 
            return res.status(500).send(err);
        }
    }

    async updateSocial (req: Request, res: Response) {
        try {
            const { social } = req.body;
            await socialRepository.updateSocial(social);
            return res.status(201);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async deleteSocial (req: Request, res: Response) {
        const { userId } = req.params;
        try {
            await socialRepository.deleteSocial(userId);
            return res.status(200);
        } catch (err) { 
            return res.status(500).send(err);
        }
    }
}

export { SocialController };