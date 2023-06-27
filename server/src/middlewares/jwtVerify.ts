import { NextFunction, Request, Response } from 'express'
import {verify} from 'jsonwebtoken'

export const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    try {
        next()
    } catch (error) {
        console.log('in the verifyToken',error);
    }
}