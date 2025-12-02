import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes";

import { Task } from "../task/task.model";
import { User } from "../user/user.model";
import { Blog } from "../blogs/blogs.model";
import { Comment } from "../comment/comment.model";
import { Newsletter } from "../newslatter/newslatter.model";
import { Contact } from "../contactMessage/contactMessage.model";
const getDashboardOverview = catchAsync(async (req: Request, res: Response) => {
  const [
    pendingTasks,
    totalMembers,
    totalSubscribers,
    totalBlogs,
    pendingComments,
    approvedComments,
    rejectedComments,
    totalContacts
  ] = await Promise.all([
    Task.countDocuments({ status: "pending" }),
    User.countDocuments({ isDeleted: false }),
    Newsletter.countDocuments(),
    Blog.countDocuments(),
    Comment.countDocuments({ status: "PENDING" }),
    Comment.countDocuments({ status: "APPROVED" }),
    Comment.countDocuments({ status: "REJECTED" }),
    Contact.countDocuments()
  ]);

  const overview = {
    pendingTasks,
    totalMembers,
    totalSubscribers,
    totalBlogs,
    comments: {
      pending: pendingComments,
      approved: approvedComments,
      rejected: rejectedComments
    },
    totalContacts
  };

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard overview fetched successfully",
    data: overview
  });
});

export const dashboardController = {
  getDashboardOverview,
};
