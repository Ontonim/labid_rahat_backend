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
exports.blogService = void 0;
const QueryBuilder_1 = require("../../../utils/QueryBuilder");
const comment_model_1 = require("../comment/comment.model");
const blogs_model_1 = require("./blogs.model");
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const builder = new QueryBuilder_1.QueryBuilder(blogs_model_1.Blog.find(), query)
        .filter()
        .search(["title", "excerpt", "content", "category", "author"])
        .sort()
        .fields()
        .paginate();
    const blogs = yield builder.build();
    const meta = yield builder.getMeta();
    return { blogs, meta };
});
/**
 * Get single blog by ID including approved comments
 */
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogs_model_1.Blog.findById(id);
    if (!blog)
        throw new Error("Blog not found");
    const comments = yield comment_model_1.Comment.find({ blogId: id, approved: true }).sort({ timestamp: -1 });
    return Object.assign(Object.assign({}, blog.toObject()), { comments });
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield blogs_model_1.Blog.findByIdAndDelete(id);
    if (!deletedBlog)
        throw new Error("Blog not found");
    return deletedBlog;
});
exports.blogService = {
    getAllBlogs,
    getBlogById,
    deleteBlog,
};
