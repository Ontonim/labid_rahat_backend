import mongoose, { Schema } from "mongoose";
import { IBlog } from "./blogs.interface";

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  source: { type: String },
  image: { type: String },
  readTime: { type: String },
  date: { type: Date, required: true },
  author: { type: String, required: true, refPath: "authorModel" },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
