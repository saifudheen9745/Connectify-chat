import mongoose, { Schema, Types } from "mongoose";

const chatSchema = new Schema({
  memberOne: {
    type: Types.ObjectId,
    ref: "users",
  },
  memberTwo: {
    type: Types.ObjectId,
    ref: "users",
  },
},
  { timestamps: { createdAt: 'created_at' } }
);

export default mongoose.model("chats", chatSchema);