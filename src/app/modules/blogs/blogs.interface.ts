import mongoose from "mongoose";

export enum TBlogStatus {
  PENDING = "pending",
  APPROVED = "approved",
}

export interface IBlog {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  source?: string;
  image?: string;
  readTime?: string;
  date: Date;
  status: TBlogStatus;
  author: string;

  createdAt: Date;
  updatedAt: Date;
}
