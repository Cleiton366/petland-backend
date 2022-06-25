import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { CheckSession } from "../middleware/CheckSession";

const chatController = new ChatController();
const router = Router();

router.get("/chat/getChat", CheckSession, chatController.getChat);
router.get("/chat/userChats", CheckSession, chatController.getUserChats);
router.get("/chat/getMessages", CheckSession, chatController.getMessages);
router.post("/chat/newMessage", CheckSession, chatController.createMessage);

export { router };