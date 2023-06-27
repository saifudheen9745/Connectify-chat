import {sign} from 'jsonwebtoken'
import mongoose from 'mongoose'

export const genAccessToken = async (data:mongoose.Types.ObjectId)=>{

    return sign(data.toString(),process.env.JWT_ACCESS_SECRET as string)

}
