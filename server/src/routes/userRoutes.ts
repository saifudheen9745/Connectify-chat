import express, { Response } from 'express'
import { cancelFriendRequest, getAllFriendRequest, getAllFriends, getAllUsers,resendFriendRequest,sentFriendRequest, updateFriendRequestStatus, updateUserDetails, uploadProfilePic } from '../controllers/userControllers'
import { upload } from '../middlewares/imageUpload'
import { MulterRequest } from '../Types/multerReqTypes'

const router = express.Router()

//Get All Users
router.get('/getAllUsers',getAllUsers)
//Sent friend request
router.post('/sentFriendRequest',sentFriendRequest)
//Cancel friend request
router.post('/cancelFriendRequest',cancelFriendRequest)
//Get friend request of a user
router.get('/getAllFriendRequest/:userId',getAllFriendRequest)
//Accept friend request
router.post('/updateFriendRequestStatus',updateFriendRequestStatus)
//Get all friends of a user
router.get('/getAllFriends/:userId',getAllFriends)
//Resed friend request
router.post('/resendFriendRequest',resendFriendRequest)
//Update user details
router.post('/updateUserDetails',updateUserDetails)
//Update user profile picture
router.post("/uploadProfilePic",upload.single('image'),uploadProfilePic);



export default router