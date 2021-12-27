import { client } from "../db/PostgresConection";
import { accountCreatedEmail } from "../services/AutomateEmailer";

class UserRepository {
  async getUser(id) {
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
    
    const query = {
      text: "INSERT INTO users(avatarUrl, id, userName, email) VALUES($1, $2, $3, $4)",
      values: [
        user.photos[0].value,
        user.id,
        user.displayName,
        user.emails[0].value,
      ],
    };
    await client.query(query, (err, res) => {
      if (err) {
        console.log("error while trying to save user on db", err.stack);
      } else {
        console.log("user saved on db suscessfully");
        accountCreatedEmail(user.emails[0].value);
        return user;
      }
    });
  }
  
  async verifyUserEmail(email : string) {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    let result;
    await client.query(query).then((res) => {
      result = res.rows[0];
    });
    if(result){
      return true;
    }else return false;
  }
}

export { UserRepository };
