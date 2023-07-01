import { userRegTypes } from "../Types/userRegDataTypes.types";
import {compare, hash} from 'bcrypt'
import { findByEmail, insertToDb } from "../repositories/authRepositories";
import { userLoginTypes } from "../Types/userLoginDataTypes.types";
import { genAccessToken } from "../jwtConfg/jwtMethods";

export const userRegHelper = async(userRegData:userRegTypes)=>{
    try {
        const duplicateUser = await findByEmail(userRegData.email)
        if(duplicateUser.length){
            throw{msg:"User already exist"}
        }
        if(userRegData?.password){
            userRegData.password = await hash(userRegData.password,10)
        }
        return await insertToDb(userRegData)
         
    } catch (error) {
        throw error
    }
}

export const userLoginHelper = async(userLoginData:userLoginTypes)=>{
    try {
        const isUserExist = await findByEmail(userLoginData?.email)
        if(isUserExist.length){
            const validUser = await compare(userLoginData?.password,isUserExist[0]?.password)
            const {_id,fullname,email,img} = isUserExist?.[0]
            if(validUser){
                const accessToken = await genAccessToken(_id)
                return {
                    _id,
                    fullname,
                    email,
                    accessToken,
                    img
                }
            }else{
                throw {message:"Invalid credentials"}
            }
        }
    } catch (error) {
        throw error
    }
}

