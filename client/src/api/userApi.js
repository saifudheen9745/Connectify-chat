import { api } from "../config/axiosConfig"

//To get all the users
export const getUsers = async()=>{
    try {
        const loginRes = await api.get('/user/getAllUsers')
        return loginRes.data
    } catch (error) {
        throw {msg:error.response.data.msg}
    }
}

//To get all the friend request of a user
export const getFriendRequests = async (user)=>{
    try {
        const getFriendReqRes = await api.get(`/user/getAllFriendRequest/${user}`)
        return getFriendReqRes.data
    } catch (error) {
         throw {msg:error.response.data.msg}
    }
}

//To get all the friends of a user
export const getAllFriends = async(user)=>{
    try {
        const getFriends = await api.get(`/user/getAllFriends/${user}`)
        return getFriends?.data
    } catch (error) {
           throw {msg:error.response.data.msg}
    }
}

//To sent friend request to a user
export const sendFriendRequest = async(userId,friendId)=>{
    try {
        const friedReqResponse = await api.post('/user/sentFriendRequest',{userId,friendId})
        return friedReqResponse.data
    } catch (error) {
        throw{error}
    }
}


//To cancel friend request to a user
export const cancelFriendRequest = async(userId,friendId)=>{
    try {
        const friedReqResponse = await api.post('/user/cancelFriendRequest',{userId,friendId})
        return friedReqResponse.data
    } catch (error) {
        throw{error}
    }
}

//To accept/decline friend request
export const updateFriendRequestStatus = async(userId,friendId,status)=>{
    try {
        const friedReqResponse = await api.post('/user/updateFriendRequestStatus',{userId,friendId,status})
        return friedReqResponse.data
    } catch (error) {
        throw{error}
    }
}

//To resend friend request once declined
export const resentFriendRequest = async(userId,friendId) => {
    try {
        const resendFriendReqResponse = await api.post('/user/resendFriendRequest',{userId,friendId})
        return resendFriendReqResponse.data
    } catch (error) {
        throw{error}
    }
}

//To update the user details
export const updateUserDetails = async(userDetails) => {
    try {
        const updateUserDetailsRes = await api.post('/user/updateUserDetails',{userDetails})
        return updateUserDetailsRes.data
    } catch (error) {
        throw{error}
    }
}

//To get the secure url from s3 to upload image 
export const updateProfilePic = async(formData) => {
    try {
        const updateUserProfilePicRes = await api.post('/user/uploadProfilePic',formData,{'headers':{'Content-Type':'multipart/form-data'}}) 
        return updateUserProfilePicRes.data
    } catch (error) {
        throw{error}
    }
}
