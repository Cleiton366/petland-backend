import { Request, Response } from "express";
import { Social } from "../models/Social";
import { SocialRepository } from "../repositories/SocialRepository";

const socialRepository = new SocialRepository();

class SocialController {
    async getSocial (req: Request, res: Response) {
        const { userid } = req.headers;
        try {
            const result = await socialRepository.getSocial(userid.toString());
            if(result) {
                return res.json(result);
            } else res.status(204)
            return res.json(result);
        } catch (err) { 
            return res.status(500).send(err);
        }
    }

    async updateSocial (req: Request, res: Response) {
        try {
            const social = req.body
            const result = await socialRepository.updateSocial(social);
            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async deleteSocial (req: Request, res: Response) {
        const { userid } = req.headers;
        try {
            const result = await socialRepository.deleteSocial(userid.toString());
            return res.status(200).json(result);
        } catch (err) { 
            return res.status(500).send(err);
        }
    }
}

export { SocialController };