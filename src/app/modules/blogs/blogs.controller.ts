import { Request, Response } from "express";
import { blogService } from "./blog.service";
import { SendResponse } from "../../../utils/sendResponse";
import { catchAsync } from "../../../utils/catchAsync";


/**
 * GET /api/blogs
 */
 const getAllBlogsController = async (req: Request, res: Response) => {
  try {
    const { blogs, meta } = await blogService.getAllBlogs(req.query as Record<string, string>);
   SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blogs fetched successfully.",
    data: { blogs, meta },
  });
  } catch (error: any) {
    return SendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message || "Failed to fetch blogs",
      data: null,
    });
  }
};

/**
 * GET /api/blogs/:id
 */
 const getBlogByIdController = async (req: Request, res: Response) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    return SendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Blog fetched successfully.",
      data: blog,
    });
  } catch (error: any) {
    return SendResponse(res, {
      statusCode: 404,
      success: false,
      message: error.message || "Failed to fetch blog",
      data: null,
    });
  }
};
const deleteBlogController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await blogService.deleteBlog(id);
  return SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog deleted successfully.",
    data: result,
  });
});

export const BlogsController = {
  getAllBlogsController,
  getBlogByIdController,
  deleteBlogController,
};
