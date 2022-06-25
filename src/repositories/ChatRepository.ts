import { v4 as uuid } from "uuid";
import { client } from "../db/PostgresConection";

class ChatRepository {
  async getChat(chatId : string) {
    const query = {
      text: "SELECT * FROM chats WHERE chatid = $1",
      values: [chatId],
    };
    const res = await client.query(query);
    if(res.rowCount === 0) {
      return null;
    }
    return res.rows[0];
  }

  async createChat(donatorId : string, interrestedDoneeId : string, petId : string) {
    const query = {
      text: "INSERT INTO chats (chatid, donatorid, interrested_doneeid, petid) VALUES ($1, $2, $3, $4)",
      values: [uuid(), donatorId, interrestedDoneeId, petId],
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

  async getUserChats(userId : string) {
    const query = {
      text: "SELECT * FROM chats WHERE donatorid = $1 OR interrested_doneeid = $1",
      values: [userId],
    };
    const res = await client.query(query);
    return res.rows;
  }

  async getMessages(chatId : string) {
    const query = {
      text: "SELECT * FROM messages WHERE chatid = $1 order by timestamp asc",
      values: [chatId],
    };
    const res = await client.query(query);
    return res.rows;
  }

  async createMessage(chatId : string, message : string, userId : string) {
    const query = {
      text: "INSERT INTO messages (chatid, user_message, user_messageid, timestamp) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
      values: [chatId, message, userId],
    };
    const res = await client.query(query);
    if(res.rowCount === 0) {
      return null;
    }

    return {
      status: "success",
      message: "Message created",
    };
  }

}

export { ChatRepository };
