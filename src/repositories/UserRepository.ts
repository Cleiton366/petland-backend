import { client } from "../db/PostgresConection";
import { accountCreatedEmail } from "../services/AutomateEmailer";

class UserRepository {
  async getUser(id: string) {
    const query = {
      text: "SELECT * FROM users WHERE id = $1",
      values: [id],
    };

    let res = await client.query(query);
    return res.rows[0];
  }

  async newUser(user) {
    const userExist = await this.verifyUserEmail(user.emails[0].value);
    if (userExist) {
      throw new Error("Error: User already exists");
    }

    const query = {
      text: "INSERT INTO users(avatarUrl, id, userName, email) VALUES($1, $2, $3, $4)",
      values: [
        user.photos[0].value,
        user.id,
        user.displayName,
        user.emails[0].value,
      ],
    };

    await client.query(query);
    await accountCreatedEmail(user.emails[0].value);

    return user;
  }

  async newUserAndroid(
    id: string,
    userName: string,
    email: string,
    avatarUrl: string
  ) {
    console.log(id, userName, email, avatarUrl);
    try {
      const userExist = await this.verifyUserEmail(email);
      if (userExist) {
        throw new Error("Error: User already exists");
      }

      const query = {
        text: "INSERT INTO users(avatarUrl, id, userName, email) VALUES($1, $2, $3, $4)",
        values: [avatarUrl, id, userName, email],
      };

      await client.query(query);
      await accountCreatedEmail(email);

      return {
        id: id,
        userName: userName,
        email: email,
        avatarUrl: avatarUrl,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyUserEmail(email: string) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };

    let res = await client.query(query);
    let userExist = res.rows.length > 0;

    return userExist;
  }

  async getDonatedPets(userId: string) {
    const query = {
      text: "SELECT * FROM pets WHERE donatorid = $1",
      values: [userId],
    };

    const res = await client.query(query);
    return res.rows;
  }

  async getUserPets(userId: string) {
    const query = {
      text: "SELECT * FROM pets WHERE ownerid = $1",
      values: [userId],
    };

    const res = await client.query(query);
    return res.rows;
  }
}

export { UserRepository };
