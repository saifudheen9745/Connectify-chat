import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  img:{
    type:String,
    required:false
  },
  friendsList: {
    type: [
      {
        sender: {
          type: Types.ObjectId,
          ref: 'users',
        },
        receiver: {
          type: Types.ObjectId,
          ref: 'users',
        },
        friendshipStatus: {
          type: String,
          default: '',
        },
      },
    ],
    default: [],
  },
});

userSchema.virtual('friends', {
  ref: 'users',
  localField: 'friendsList.receiver',
  foreignField: '_id',
  justOne: false,
  options: { select: '_id fullname email' } // Include _id in the result
});



export default mongoose.model('users',userSchema)