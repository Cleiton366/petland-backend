import { UserController } from "../controllers/UserController";
import { Router } from "express";

const router = Router();
const userController = new UserController();

router.get("/user", (req, res) => {
    const user = userController.getUser(req, res);
    res.json(user);
});

export { router };