import { app } from "../src/app";
import request from "supertest";

describe ("Chats", () => {

    const chatId = 'testchat';
    const userId = '1545028452517592';

    it("should return a chat", async () => {
        const response = await request(app)
        .get("/chat/getChat")
        .set("chatId", chatId);
        expect(response.body).toHaveProperty("chatid");
    });

    it("should return user chats", async () => {
        const response = await request(app)
        .get("/chat/userChats")
        .set("userId", userId);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("should create a message", async () => {
        const response = await request(app)
        .post("/chat/newMessage")
        .send({
            message: "test message",
            chatId: chatId,
            userId: userId
        })
        expect(response.body.status).toBe("success");
    });

    it("should return messages from a chat", async () => {
        const response = await request(app)
        .get("/chat/getMessages")
        .set("chatId", chatId);
        expect(response.body.length).toBeGreaterThan(0);
    });
}); 