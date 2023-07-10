import { Types } from "mongoose";
import chatModel from "../Model/chatModel";
import usersModel from "../Model/usersModel";
import messageModel from "../Model/messageModel";
import { chatInterface } from "../Types/userChatTypes";

export const createAChatInDb = async (chatObj: {
  memberOne: Types.ObjectId;
  memberTwo: Types.ObjectId;
}) => {
  try {
    const existingChat = await chatModel
      .findOne({
        memberOne: { $in: [chatObj.memberOne, chatObj.memberTwo] },
        memberTwo: { $in: [chatObj.memberOne, chatObj.memberTwo] },
      })
      .populate("memberOne", "fullname email img")
      .populate("memberTwo", "fullname email img");

    const chatMessages = await messageModel
      .find({ chatId: existingChat?._id })
      .populate("sender", "fullname email img");

    if (!existingChat) {
      const createdChat = await chatModel.create(chatObj);
      const chat = await chatModel
        .findById(createdChat?._id)
        .populate("memberOne", "fullname email img")
        .populate("memberTwo", "fullname email img");
      const chatMessages = await messageModel
        .findById({ chatId: createdChat?._id })
        .populate("sender", "fullname email img");
      return { chat, chatMessages };
    } else {
      return { existingChat, chatMessages };
    }
  } catch (error) {
    console.log(error);

    throw { error };
  }
};

export const saveAMessageInDb = async (messageObj: {
  chatId: Types.ObjectId;
  sender: Types.ObjectId;
  message: string;
}) => {
  try {

    return await (
      await messageModel.create(messageObj)
    ).populate("sender", "fullname email img");
  } catch (error) {
    console.log(error);

    throw { error };
  }
};
