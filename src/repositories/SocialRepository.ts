import { client } from "../db/PostgresConection";

class SocialRepository {
    async getSocial (userid : String) {

        const following = await (await client.query("SELECT * FROM social WHERE follower_user_id = $1", [userid])).rows;
        const followers = await (await client.query("SELECT * FROM social WHERE following_user_id = $1", [userid])).rows;

        const userFriendList = {
            followingQtd: following.length,
            followersQtd: followers.length,
            followers: followers,
            following: following,
        }

        return userFriendList
    }

    async updateSocial (social) {
        const query = {
            text: "INSERT INTO social (follower_user_id, follower_username, follower_user_avatarurl, following_user_id, following_username, following_user_avatarurl) VALUES ($1, $2, $3, $4, $5, $6)",
            values: [social.follower_user_id, social.follower_username, social.follower_user_avatarurl, social.following_user_id, social.following_username, social.following_user_avatarurl]
        }

       const res = await client.query(query);
       return res;
    }

    async deleteSocial (userid : String) {
        const res = await client.query("DELETE FROM social WHERE follower_user_id = $1", [userid]);
        return res;
    }
}

export { SocialRepository };