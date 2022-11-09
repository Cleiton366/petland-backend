import { client } from "../db/PostgresConection";
import { Social } from "../models/Social";
import { UserFriendlist } from "../models/UserFriendlist";

class SocialRepository {
    async getSocial (userid : String) {
        var userFriendList : UserFriendlist

        const following = await client.query("SELECT * FROM social WHERE follower_user_id = $1", [userid]);
        const followers = await client.query("SELECT * FROM social WHERE following_user_id = $1", [userid]);

        userFriendList.followers = followers.rows
        userFriendList.following = following.rows
        userFriendList.followersQtd = followers.rowCount
        userFriendList.followingQtd = following.rowCount

        return userFriendList
    }

    async updateSocial (social : Social) {
        const query = {
            text: "INSERT INTO social (follower_user_id, follower_username, follower_user_avatarurl, following_user_id, following_username, following_user_avatarurl) VALUES ($1, $2, $3, $4, $5, $6)",
            values: [social.followerUserId, social.followerUsername, social.followerUserAvatarurl, social.followingUserId, social.followingUsername, social.followingUserAvatarurl]
        }

        await client.query(query);
    }

    async deleteSocial (userid : String) {
        await client.query("DELETE FROM social WHERE follower_user_id = $1", [userid]);
    }
}

export { SocialRepository };