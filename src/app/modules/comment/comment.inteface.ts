import { Types } from "mongoose";

export enum CommentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface IComment {
  _id?: string;
  name: string;
  email: string;
  comment: string;
  blogId: Types.ObjectId;
  status?: CommentStatus;
  approved?: boolean;
  isdeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
