import { Request, Response } from "express";
import { ChatRepository } from "../repositories/ChatRepository";

const chatRepository = new ChatRepository();

class ChatController {

    async getChat(req: Request, res: Response) {
        const { chatId } = req.body;
        const chat = await chatRepository.getChat(chatId);
        if(chat === null) return res.status(404).send("Chat not found");
        return res.status(200).json(chat);
    }

    async getUserChats(req: Request, res: Response) {
        const { userId } = req.body;
        const chatList = await chatRepository.getUserChats(userId);
        return res.status(200).json(chatList);
    }

    async createChat(req: Request, res: Response) {
        const { donatorId, interrestedDoneeId, petId } = req.body;
        const newChat = await chatRepository.createChat(donatorId, interrestedDoneeId, petId);
        if(newChat === null) return res.status(500).send("Error creating chat");
        return res.status(200).json(newChat);
    }

    async getMessages(req: Request, res: Response) {
        const { chatId } = req.body;
        const messagesList = await chatRepository.getMessages(chatId);
        return res.status(200).json(messagesList);
    }

    async createMessage(req: Request, res: Response) {
        const {chatId, message, userId} = req.body;
        const newMessage = await chatRepository.createMessage(chatId, message, userId);
        if(newMessage === null) return res.status(500).send("Error creating message");
        return res.status(200).json(newMessage);
    }
}

export { ChatController };