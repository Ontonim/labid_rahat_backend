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
  blogId: string;
  status?: CommentStatus;
  approved?: boolean;
  isdeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
