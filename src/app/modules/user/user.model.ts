import { Schema, model } from "mongoose";
import { IUser, Role, isActive } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
   role: { type: String, enum: Object.values(Role), default: Role.USER },
    isActive: { type: String, enum: Object.values(isActive), default: isActive.ACTIVE },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
