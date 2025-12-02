import mongoose, { Schema } from "mongoose";
import { IBlog } from "./blogs.interface";

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  source: { type: String , required: true },
  image: { type: String, required: true },
  readTime: { type: String, required: true },
  date: { type: Date, required: true },
  author: { type: String },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
