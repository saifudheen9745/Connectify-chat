import usersModel from "../Model/usersModel";
import { userRegTypes } from "../Types/userRegDataTypes.types";

export const insertToDb = async(userRegData:userRegTypes)=>{
    try {       
        return await usersModel.create(userRegData)      
    } catch (error) {
        throw{error}
    }
}

export const findByEmail = async(userEmail:string)=>{
    try {
        return await usersModel.find({email:userEmail})
    } catch (error) {
        throw {error}
    }
}

