import { createAChatInDb, saveAMessageInDb } from "../repositories/chatRepositories"
import {Types} from 'mongoose'

export const createAChatHelper = async(memberOne:string,memberTwo:string)=>{
    try {
        const chatObj = {
            memberOne:new Types.ObjectId(memberOne),
            memberTwo:new Types.ObjectId(memberTwo)
        }
        return await createAChatInDb(chatObj)
    } catch (error) {
        throw{error}
    }
}

export const sendAMessageHelper = async(chatObj:{chatId:string,sender:string,message:string})=>{
    try {
        const newChatObj = {
          chatId: new Types.ObjectId(chatObj?.chatId),
          sender: new Types.ObjectId(chatObj?.sender),
          message: chatObj?.message
        };
        return await saveAMessageInDb(newChatObj)
    } catch (error) {
        throw{error}
    }
}