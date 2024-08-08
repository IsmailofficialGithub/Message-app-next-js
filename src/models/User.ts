import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
  userName: {
    type: String,
    required: [true, "User Name required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify code Expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});


const UserModel= (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel;