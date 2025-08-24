import mongoose from "mongoose";

export enum TBlogStatus {
  PENDING = "pending",
  APPROVED = "approved",
}

export interface IBlog {
 title: string;
  featureImage?: string;
  category: string;
  description: string;
  content: string;
  status: "pending" | "approved";
  author: mongoose.Types.ObjectId | string;
  authorModel: "User" | "Admin";
  createdAt: Date;
  updatedAt: Date;
}
