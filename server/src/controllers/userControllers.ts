import { Request, Response } from "express"
import { cancelFrindRequestHelper, getAllFriendRequestHelper, getAllFriendsOfUserHelper, resendFriendRequestHelper, sentFriendRequestHelper, updateFriendRequestStatusHelper, updateUserDetailsHelper, userGetAllUsersHelper } from "../helpers/userHelpers"
// import { generateUploadURL } from "../middlewares/s3"
import { MulterRequest } from "../Types/multerReqTypes"
import { uploadImageToS3 } from "../middlewares/s3"



export const getAllUsers = async(req:Request,res:Response)=>{
    try {
        const response = await userGetAllUsersHelper()
        res.status(200).json(response)
    } catch (error:any) {
        res.status(400).json({msg:"Cannot get users"})
    }
    
}

export const sentFriendRequest = async(req:Request,res:Response)=>{
    try{
         const response = await sentFriendRequestHelper(req.body.userId,req.body.friendId)
         res.status(200).json({msg:"Request sent"})
    }catch(error:any){
        res.status(400).json({msg:"Request not sent"})
    }
}

export const cancelFriendRequest = async(req:Request,res:Response)=>{
    try {
        const response = await cancelFrindRequestHelper(req.body.userId,req.body.friendId)
        res.status(200).json({msg:"Cancel request succes"})
    } catch (error) {
         res.status(400).json({msg:"Cancel request failed"})
    }
}

export const getAllFriendRequest = async(req:Request,res:Response)=>{
    try {
        const response = await getAllFriendRequestHelper(req.params.userId)
        res.status(200).json({data:true,response})
    } catch (error) {
        res.status(400).json({data:false,error})
    }
}

export const updateFriendRequestStatus = async(req:Request,res:Response)=>{
    try {
        const response = await updateFriendRequestStatusHelper(req.body.userId,req.body.friendId,req.body.status)
        res.status(200).json({updated:true})
    } catch (error) {
        res.status(400).json({updated:false})
    }
}

export const resendFriendRequest = async(req:Request,res:Response)=>{
    try {
        const response = await resendFriendRequestHelper(req.body.userId,req.body.friendId)
        res.status(200).json({ResendFriendReq:true})
    } catch (error) {
        res.status(400).json({ResendFriendReq:false})
    }
}

export const getAllFriends = async(req:Request,res:Response)=>{
    try {
        const response = await getAllFriendsOfUserHelper(req.params.userId)
        
        res.status(200).json({data:true,response})
    } catch (error) {
        res.status(400).json({data:false,error})
    }
}

export const updateUserDetails = async (req:Request,res:Response)=>{
    try {

        const response = await updateUserDetailsHelper(req.body.userDetails)
        
        res.status(200).json({updated:true})
    } catch (error) {
        console.log(error);
        
        res.status(400).json({updated:false})
    }
}

// export const generateSecureURL = async (req:Request,res:Response)=>{
//     try {
//         console.log(req.body.userId);
        
//         const url = await generateUploadURL(req.body.userId)
//         console.log(url)
        
//         if(url){
//             res.status(200).json({'url':url})
//         }
//     } catch (error) {
//         res.status(400).json({createdURL:false})
//     }
// }


export const uploadProfilePic = async (req: Request, res: Response) => {
  try {

    await uploadImageToS3(req.body.imageName,req.file?.buffer,req.file?.mimetype)
    res.status(200).json({upload:true})
  } catch (error) {
   
    res.status(400).json({ upload: false });
  }
};