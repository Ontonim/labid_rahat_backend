import { Request, Response } from "express";
import { BlogServices } from "./blog.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";

// ১. Admin blog create
const createBlogByAdmin = catchAsync(async (req: Request, res: Response) => {
  const { adminId } = req.query as { adminId: string };
  const result = await BlogServices.createBlogByAdmin(req.body, adminId);

  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog created by admin successfully!",
    data: result,
  });
});

// ২. User blog submit
const submitBlogByUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.query as { userId: string };
  const result = await BlogServices.submitBlogByUser(req.body, userId);

  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog submitted successfully! Waiting for approval.",
    data: result,
  });
});

// ৩. Approve blog
const approveBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogServices.approveBlog(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog approved successfully!",
    data: result,
  });
});

// ৪. Update blog
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.query as { id: string };
  const result = await BlogServices.updateBlog(id, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog updated successfully!",
    data: result,
  });
});

// ৫. Get Admin blogs
const getAdminBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAdminBlogs(req.query as Record<string, string>);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin blogs fetched successfully!",
    data: result.data,
    meta: result.meta,
  });
});

// ৬. Get User blogs
const getUserBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getUserBlogs(req.query as Record<string, string>);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User blogs fetched successfully!",
    data: result.data,
    meta: result.meta,
  });
});
const getPendingUserBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getPendingUserBlogs(req.query as Record<string, string>);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pending user blogs fetched successfully!",
    data: result.data,
    meta: result.meta,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BlogServices.deleteBlog(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully!",
    data: result,
  });
});
export const BlogController = {
  createBlogByAdmin,
  submitBlogByUser,
  approveBlog,
  getPendingUserBlogs,
  updateBlog,
  getAdminBlogs,
  getUserBlogs,
  deleteBlog
};
