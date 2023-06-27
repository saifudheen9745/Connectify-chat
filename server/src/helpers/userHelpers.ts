import { Types } from "mongoose"
import { addFriendRequest, cancelFriendRequest, getAllUsersFromDb, getOneUserDetailsById, resendFriendRequestInDb, updateFriendRequest, updateUserDetailsInDb } from "../repositories/userRepositories"

export const userGetAllUsersHelper = async()=>{
    try {
        return getAllUsersFromDb()
    } catch (error) {
        throw {error}
    }
}

export const sentFriendRequestHelper = async(userId:string,friendId:string)=>{
    try {
        const friendRequestSentObj = {
            sender:new Types.ObjectId(userId),
            receiver:new Types.ObjectId(friendId),
            friendshipStatus:'sent'
        }
        const friendRequestReceiveObj = {
            sender:new Types.ObjectId(userId),
            receiver:new Types.ObjectId(friendId),
            friendshipStatus:'received'
        }
        return await addFriendRequest(friendRequestSentObj,friendRequestReceiveObj)
    } catch (error) {
        throw{error}
    }
}

export const cancelFrindRequestHelper = async(userId:string,friendId:string)=>{
    try {
        return cancelFriendRequest(new Types.ObjectId(userId),new Types.ObjectId(friendId))
    } catch (error) {
        throw{error}
    }
}

export const getAllFriendRequestHelper = async(userId:string)=>{
    try {
        const userDetails:any = await getOneUserDetailsById(new Types.ObjectId(userId))
        return userDetails?.friendsList
    } catch (error) {
        throw{error}
    }
}

export const updateFriendRequestStatusHelper = async(userId:string,friendId:string,status:string)=>{
    try {
        return updateFriendRequest(new Types.ObjectId(userId),new Types.ObjectId(friendId),status)
    } catch (error) {
        throw{error}
    }
}

export const resendFriendRequestHelper = async(userId:string,friendId:string)=>{
    try {
        return resendFriendRequestInDb(new Types.ObjectId(userId),new Types.ObjectId(friendId))
    } catch (error) {
        throw{error}
    }
}

export const getAllFriendsOfUserHelper = async(userId:string)=>{
    try {
        return await getOneUserDetailsById(new Types.ObjectId(userId))
    } catch (error) {
        throw{error}
    }
}

export const updateUserDetailsHelper = async({userId,fullname,email}:{userId:string,fullname:string,email:string})=>{
    try {
        return await updateUserDetailsInDb(new Types.ObjectId(userId),fullname,email)
    } catch (error) {
        throw{error}
    }
}