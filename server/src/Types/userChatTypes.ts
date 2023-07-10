import { Types } from "mongoose";

export interface chatInterface {
    _id: Types.ObjectId,
    memberOne?:any,
    memberTwo?:any,
    created_At?:any,
    updatedAt?:any,
    messages?:any
}