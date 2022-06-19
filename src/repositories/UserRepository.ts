import { client } from "../db/PostgresConection";
import { accountCreatedEmail } from "../services/AutomateEmailer";

class UserRepository {
  async getUser(id : string) {
    try {
      const query = {
        text: "SELECT * FROM users WHERE id = $1",
        values: [id],
      };
      let user;
      await client.query(query).then((res) => {
        user = res.rows[0];
      });
      return user;
    } catch (err) {
      return err;
    }
  }
 
  async newUser(user) {
    const userExist = await this.verifyUserEmail(user.emails[0].value);
    if(userExist){
      return null;
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
    client.query(query, (err, res) => {
      if (err) {
        return {
          status: "error",
          message: err,
        }
      }
    });
    
    accountCreatedEmail(user.emails[0].value);
    return user;
  }

  async verifyUserEmail(email: string) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    var userExist = false;
    await client.query(query).then((res) => {
      if(res.rows.length > 0){
        userExist = true;
      }
    });
    return userExist;
  }

  async getDonatedPets(userId: string) {
    const query = {
      text: "SELECT * FROM pets WHERE donatorid = $1",
      values: [userId],
    };
    const donatedPetsList = client
    .query(query)
    .then(res => {
      return res.rows;
    })
    .catch(e => console.error(e.stack));
    return donatedPetsList;
  }

  async getUserPets(userId: string) {
    const query = {
      text: "SELECT * FROM pets WHERE ownerid = $1",
      values: [userId],
    };
    const donatedPetsList = client
    .query(query)
    .then(res => {
      return res.rows;
    })
    .catch(e => console.error(e.stack));
    return donatedPetsList;
  }
}

export { UserRepository };
