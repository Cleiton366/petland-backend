import { Request, Response } from "express";
import {ChatRepository} from "../repositories/ChatRepository";

const chatRepository = new ChatRepository();

class ChatController {

    async getChat(req: Request, res: Response) {
        const { chatId } = req.body;
        const chat = await chatRepository.getChat(chatId);
        return res.json(chat);
    }

    async getUserChats(req: Request, res: Response) {
        const { userId } = req.body;
        const chatList = await chatRepository.getUserChats(userId);
        return res.json(chatList);
    }

    async createChat(req: Request, res: Response) {
        const {chatId, firsUserId, secondUserId} = req.body;
        const chat = await chatRepository.createChat(chatId, firsUserId, secondUserId);
        return res.json(chat);
    }

    async getMessages(req: Request, res: Response) {
        const {chatId} = req.body;
        const messagesList = await chatRepository.getMessages(chatId);
        return res.json(messagesList);
    }

    async createMessage(req: Request, res: Response) {
        const {chatId, message, timeStamp, userId, userProfilePicture} = req.body;
        const newMessage = await chatRepository.createMessage
        (chatId, message, timeStamp, userId, userProfilePicture);
        return res.json(newMessage);
    }
}

export { ChatController };