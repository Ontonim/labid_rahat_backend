import { Comment } from "./comment.model";
import { IComment, CommentStatus } from "./comment.inteface";
import { QueryBuilder } from "../../../utils/QueryBuilder";

const createComment = async (payload: IComment) => {
  const newComment = await Comment.create({
    ...payload,
    status: CommentStatus.PENDING,
    approved: false,
  });
  return newComment;
};

const getAllComments = async (query: Record<string, string>) => {
  // QueryBuilder instance
  const qb = new QueryBuilder<IComment>(Comment.find().populate("blogId", "title"), query);

  // filter, search, sort, fields, paginate
  qb.filter().search(["name", "email", "comment"]).sort().fields().paginate();

  // Build query
  const comments = await qb.build();

  // meta info
  const meta = await qb.getMeta();

  return { comments, meta };
};

const updateCommentStatus = async (id: string, status: CommentStatus | string) => {

  const approved = status === CommentStatus.APPROVED;

  const updated = await Comment.findByIdAndUpdate(
    id,
    { status: status, approved },
    { new: true, runValidators: true }
  );

  if (!updated) throw new Error("Comment not found");

  return updated;
};


const deleteComment = async (id: string) => {
  const deleted = await Comment.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return deleted;
};

export const CommentService = {
  createComment,
  getAllComments,
  updateCommentStatus,
  deleteComment
};
