import { Schema, model, Types } from "mongoose";
import { IComment, CommentStatus } from "./comment.inteface";

const commentSchema = new Schema<IComment>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },

    blogId: {
      type: Schema.Types.ObjectId, 
      ref: "Blog",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(CommentStatus),
      default: CommentStatus.PENDING,
    },
    approved: { type: Boolean, default: false },
    isdeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", commentSchema);
