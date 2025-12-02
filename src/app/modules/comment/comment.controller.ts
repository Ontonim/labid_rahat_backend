import { Request, Response } from "express";

import { CommentService } from "./comment.service";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
// POST — Public Comment
export const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.createComment(req.body);
  SendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Comment submitted successfully. Awaiting admin approval.",
    data: result,
  });
});

// GET — Admin only
export const getAllComments = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentService.getAllComments(req.query as Record<string, string>);
  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All comments retrieved successfully.",
    data: result,
  });
});

// PATCH — Admin only (Update status)
export const updateCommentStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await CommentService.updateCommentStatus(id, status);
  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comment status updated successfully.",
    data: result,
  });
});
// DELETE — Admin only (Soft delete)
export const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CommentService.deleteComment(id);
  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comment deleted successfully.",
    data: result,
  });
});