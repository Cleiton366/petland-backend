import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { CheckSession } from "../middleware/CheckSession";

const chatController = new ChatController();
const router = Router();

router.get("/chat/GetChat", CheckSession, chatController.getChat);
router.get("/chat/MyChats", CheckSession, chatController.getUserChats);
router.post("/chat/NewChat", CheckSession, chatController.createChat);
router.get("/chat/GetMessages", CheckSession, chatController.getMessages);
router.post("/chat/NewMessage", CheckSession, chatController.createMessage);

export { router };