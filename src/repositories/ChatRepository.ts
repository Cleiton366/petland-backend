import { v4 as uuid } from "uuid";
import { client } from "../db/PostgresConection";

class ChatRepository {
  async getChat(chatId : string) {
    const query = {
      text: "SELECT * FROM chats WHERE chatid = $1",
      values: [chatId],
    };
    const chat = await client.query(query, (err, res) => {
      if (err) {
        return null;
      }
    });
    return chat;
  }

  async createChat(donatorid : string, interrestedDoneeId : string, petId : string) {
    const query = {
      text: "INSERT INTO chats (chatid, donatorid, interrested_doneeid, petid) VALUES ($1, $2, $3, $4)",
      values: [uuid(), donatorid, interrestedDoneeId, petId],
    };
    await client.query(query, (err, res) => {
      if (err) {
        return null;
      }
    });
    return {
      status: "success",
      message: "Chat created",
    };
  }

  async getUserChats(userId) {
    const query = {
      text: "SELECT * FROM chats WHERE donatorid = $1 OR interrested_doneeid = $1",
      values: [userId],
    };
    const res = await client.query(query);
    return res.rows;
  }

  async getMessages(chatId) {
    const query = {
      text: "SELECT * FROM messages WHERE chatid = $1 order by timestamp asc",
      values: [chatId],
    };
    const res = await client.query(query);
    return res.rows;
  }

  async createMessage(chatId, message, userId) {
    const query = {
      text: "INSERT INTO messages (chatid, message, user_messageid, timestamp) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
      values: [chatId, message, userId],
    };
    await client.query(query, (err, res) => {
      if (err) {
        return null;;
      }
    });
    return {
      status: "success",
      message: "Message created",
    };
  }

}

export { ChatRepository };
