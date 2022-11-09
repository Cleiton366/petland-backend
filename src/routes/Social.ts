import { Router } from "express";
import { CheckSession } from "../middleware/CheckSession";
import { SocialController } from "../controllers/SocialController";

const socialController = new SocialController();

const router = Router();

router.get("/social/user-social-info", CheckSession, socialController.getSocial);
router.post("/social/update-social-info", CheckSession, socialController.updateSocial);
router.delete("/social/delete-social-info", CheckSession, socialController.deleteSocial);

export { router };