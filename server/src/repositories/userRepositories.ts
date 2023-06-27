import { Types } from "mongoose";
import usersModel from "../Model/usersModel";
import { FriendRequestInterface } from "../Types/userFriendRequest.types";

export const getAllUsersFromDb = async () => {
  try {
    return await usersModel.find();
  } catch (error) {
    throw { error };
  }
};

export const addFriendRequest = async (
  friendRequestSentObj: FriendRequestInterface,
  friendRequestReceiveObj: FriendRequestInterface
) => {
  try {
    return usersModel
      .updateOne(
        { _id: friendRequestSentObj.sender },
        { $addToSet: { friendsList: friendRequestSentObj } }
      )
      .then(async () => {
        return await usersModel.findOneAndUpdate(
          { _id: friendRequestReceiveObj.receiver },
          { $addToSet: { friendsList: friendRequestReceiveObj } },
          { new: true }
        );
      });
  } catch (error) {
  

    throw { error };
  }
};

export const cancelFriendRequest = async (
  userId: Types.ObjectId,
  friendId: Types.ObjectId
) => {
  try {
    const dbres = await usersModel.updateOne(
      { _id: userId },
      { $pull: { friendsList: { receiver: friendId } } }
    );
    const dbres2 = await usersModel.updateOne(
      { _id: friendId },
      { $pull: { friendsList: { sender: userId } } }
    );
    return;
  } catch (error) {
    throw { error };
  }
};

export const getOneUserDetailsById = async (userId: Types.ObjectId) => {
  try {
    return await usersModel
      .findById(userId)
      .populate("friendsList.receiver", "fullname email")
      .populate("friendsList.sender", "fullname email");
  } catch (error) {

    throw { error };
  }
};

export const updateFriendRequest = async (
  userId: Types.ObjectId,
  friendId: Types.ObjectId,
  status: string
) => {
  try {

    const user = await usersModel.updateOne(
      {
        _id: userId,
        friendsList: {
          $elemMatch: {
            sender: friendId,
            receiver: userId,
            friendshipStatus: "received",
          },
        },
      },
      {
        $set: {
          "friendsList.$.friendshipStatus": status,
        },
      }
    );

    const friend = await usersModel.updateOne(
      {
        _id: friendId,
        friendsList: {
          $elemMatch: {
            sender: friendId,
            receiver: userId,
            friendshipStatus: "sent",
          },
        },
      },
      {
        $set: {
          "friendsList.$.friendshipStatus": status,
        },
      }
    );

    return;
  } catch (error) {

    throw { error };
  }
};

export const resendFriendRequestInDb = async(
    userId: Types.ObjectId,
  friendId: Types.ObjectId
  ) => {
    try {
      const user = await usersModel.updateOne(
      {
        _id: userId,
        friendsList: {
          $elemMatch: {
            sender: userId,
            receiver: friendId,
            friendshipStatus: "declined",
          },
        },
      },
      {
        $set: {
          "friendsList.$.friendshipStatus": 'sent',
        },
      }
    );

    const friend = await usersModel.updateOne(
      {
        _id: friendId,
        friendsList: {
          $elemMatch: {
            sender: userId,
            receiver: friendId,
            friendshipStatus: "declined",
          },
        },
      },
      {
        $set: {
          "friendsList.$.friendshipStatus": 'received',
        },
      }
    );
    return
    } catch (error) {
      throw {error}
    }
}

export const updateUserDetailsInDb = async (userId:Types.ObjectId,fullname:string,email:string)=>{
  try {
    return await usersModel.updateOne({_id:userId},{$set:{fullname:fullname,email:email}})
  } catch (error) {
    throw {error}
  }
}
