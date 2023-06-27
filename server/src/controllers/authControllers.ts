import { Request, Response, response } from "express";
import { userLoginHelper, userRegHelper } from "../helpers/authHelpers";

export const doLogin = async(req:Request,res:Response)=>{
    try {
        const response = await userLoginHelper(req.body)
        res.status(200).json(response)
    } catch (error:any) {
        if(error.message === 'Invalid credentials'){
            res.status(401).json({msg:error.message})
        }else{
            res.status(404).json({msg:'User not registered'})
        }
    }
}

export const doRegister = async(req:Request,res:Response)=>{
    try {
        const response = await userRegHelper(req.body)
        res.status(201).json({"created":true})
    } catch (error:any) {
        res.status(400).json({"created":false,msg:error})
    }
    
}

