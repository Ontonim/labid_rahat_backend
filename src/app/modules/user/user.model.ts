import { Schema, model } from "mongoose";
import { IUser, isActive } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true }, 
    bio: { type: String },
    access:{type: String,default:"member"},
    expertise: [{ type: String }],
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    status: { type: String, enum: Object.values(isActive), default: isActive.ACTIVE },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
