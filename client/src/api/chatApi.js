import { api } from "../config/axiosConfig";

export const createAChat = async(chatObj)=>{
    try {
        const createChatRes = await api.post('/chat/createAChat',chatObj)
        return createChatRes.data
    } catch (error) {
        throw{error}
    }
}

export const sendAMessage = async(messageObj)=>{
    try {
        const sendAMsgRes = await api.post('/chat/sendAMessage',messageObj)
        return sendAMsgRes.data
    } catch (error) {
        throw{error}
    }
}