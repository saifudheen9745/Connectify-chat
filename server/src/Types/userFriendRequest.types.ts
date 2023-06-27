import { Types } from "mongoose";

export interface  FriendRequestInterface {
    sender:Types.ObjectId,
    receiver:Types.ObjectId,
    friendshipStatus:string
}