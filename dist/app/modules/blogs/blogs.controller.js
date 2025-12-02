"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsController = void 0;
const blog_service_1 = require("./blog.service");
const sendResponse_1 = require("../../../utils/sendResponse");
const catchAsync_1 = require("../../../utils/catchAsync");
const createBlogController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogData = req.body;
    const newBlog = yield blog_service_1.blogService.createBlog(blogData);
    return (0, sendResponse_1.SendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Blog created successfully",
        data: newBlog,
    });
}));
/**
 * PATCH /api/blogs/:id
 * Update blog (text + image)
 */
const updateBlogController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const blogData = req.body;
    const updatedBlog = yield blog_service_1.blogService.updateBlog(id, blogData);
    return (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog,
    });
}));
/**
 * GET /api/blogs
 */
const getAllBlogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { blogs, meta } = yield blog_service_1.blogService.getAllBlogs(req.query);
        (0, sendResponse_1.SendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "Blogs fetched successfully.",
            data: { blogs, meta },
        });
    }
    catch (error) {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 500,
            success: false,
            message: error.message || "Failed to fetch blogs",
            data: null,
        });
    }
});
/**
 * GET /api/blogs/:id
 */
const getBlogByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield blog_service_1.blogService.getBlogById(req.params.id);
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 200,
            success: true,
            message: "Blog fetched successfully.",
            data: blog,
        });
    }
    catch (error) {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 404,
            success: false,
            message: error.message || "Failed to fetch blog",
            data: null,
        });
    }
});
const deleteBlogController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.blogService.deleteBlog(id);
    return (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Blog deleted successfully.",
        data: result,
    });
}));
exports.BlogsController = {
    getAllBlogsController,
    getBlogByIdController,
    deleteBlogController,
    createBlogController,
    updateBlogController,
};
