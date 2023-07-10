import mongoose, {Schema,Types} from 'mongoose'

const messageSchema = new Schema(
  {
    chatId: {
      type: Types.ObjectId,
      required: true,
    },
    sender: {
      type: Types.ObjectId,
      required: true,
      ref: "users",
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

export default mongoose.model('messages',messageSchema)