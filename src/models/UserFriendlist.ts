import { User } from "./User";

type UserFriendlist = {
    followingQtd: number;
    followersQtd: number;
    followers: User[];
    following: User[];
}

export { UserFriendlist };