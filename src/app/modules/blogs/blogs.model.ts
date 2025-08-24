import mongoose, { Schema } from "mongoose";
import { IBlog } from "./blogs.interface";



const BlogSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  featureImage: { type: String },
  category: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },

  author: { type: Schema.Types.ObjectId, required: true, refPath: "authorModel" },
  authorModel: { type: String, required: true, enum: ["User", "Admin"] },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const BlogModel = mongoose.model<IBlog>("Blog", BlogSchema);
