import { v4 as uuid } from "uuid";
import { client } from "../db/PostgresConection";

class ChatRepository {
  async getChat(chatId) {
    const query = {
      text: "SELECT * FROM chat WHERE first_user_id = $1 OR second_user_id = $1",
      values: [chatId],
    };
    const chat = await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to get chat on db", err.stack);
      }
    });
    return chat;
  }

  async createChat(chatId, firstUserId, secondUserId) {
    const query = {
      text: "INSERT INTO chat (id, first_user_id, second_user_id) VALUES ($1, $2, $3)",
      values: [uuid(), firstUserId, secondUserId],
    };
    const chat = await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to create chat on db", err.stack);
      }
    });
    return chat;
  }

  async getUserChats(userId) {
    const query = {
      text: "SELECT * FROM chat WHERE first_user_id = $1 OR second_user_id = $1",
      values: [userId],
    };
    let chatList = [];
    await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to get user chats on db", err.stack);
      } else {
        for (let i = 0; i < res.rows.length; i++) {
          chatList.push(res.rows[i]);
        }
      }
    });
    return chatList;
  }

  async getMessages(chatId) {
    const query = {
      text: "SELECT * FROM message WHERE chat_id = $1 sortedBy = time_stamp",
      values: [chatId],
    };
    const messageList = client
      .query(query)
      .then(res => {
        return res.rows;
      })
      .catch(e => console.error(e.stack));
      return messageList;
  }

  async createMessage(chatId, message, timeStamp, userId, userProfilePicture) {
    const query = {
      text: "INSERT INTO message (chat_id, message, time_stamp, user_id, user_profile_picture) VALUES ($1, $2, $3, $4, $5)",
      values: [chatId, message, timeStamp, userId, userProfilePicture],
    };
    const newMessage = await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to create message on db", err.stack);
      }
    });
    return newMessage;
  }

}

export { ChatRepository };
