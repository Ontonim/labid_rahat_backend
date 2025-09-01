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
exports.BlogServices = void 0;
const QueryBuilder_1 = require("../../../utils/QueryBuilder");
const blogs_model_1 = require("./blogs.model");
// ১. Admin blog create
const createBlogByAdmin = (payload, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blogs_model_1.BlogModel.create(Object.assign(Object.assign({}, payload), { status: "approved", author: adminId, authorModel: "Admin" }));
});
// ২. User blog submit
const submitBlogByUser = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blogs_model_1.BlogModel.create(Object.assign(Object.assign({}, payload), { status: "pending", author: userId, authorModel: "User" }));
});
// ৩. Approve blog
const approveBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield blogs_model_1.BlogModel.findByIdAndUpdate(id, { status: "approved" }, { new: true });
});
// ৪. Update blog (title, description, image)
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blogs_model_1.BlogModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedBlog;
});
// ৫. Get Admin Blogs
const getAdminBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.QueryBuilder(blogs_model_1.BlogModel.find({ authorModel: "Admin" }), query)
        .filter()
        .search(["title", "category", "content"])
        .sort()
        .fields()
        .paginate();
    const data = yield blogQuery.build();
    const meta = yield blogQuery.getMeta();
    return { data, meta };
});
const getUserBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.QueryBuilder(blogs_model_1.BlogModel.find({ authorModel: "User", status: "approved" })
        .populate("author", "name email"), query)
        .filter()
        .search(["title", "category", "content"])
        .sort()
        .fields()
        .paginate();
    const data = yield blogQuery.build();
    const meta = yield blogQuery.getMeta();
    return { data, meta };
});
const getPendingUserBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const status = query.status || "pending";
    const blogQuery = new QueryBuilder_1.QueryBuilder(blogs_model_1.BlogModel.find({ authorModel: "User", status }).populate("author", "name email"), query)
        .filter()
        .search(["title", "category", "content"])
        .sort()
        .fields()
        .paginate();
    const data = yield blogQuery.build();
    const meta = yield blogQuery.getMeta();
    return { data, meta };
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBlog = yield blogs_model_1.BlogModel.findByIdAndDelete(id);
    return deletedBlog;
});
exports.BlogServices = {
    createBlogByAdmin,
    submitBlogByUser,
    approveBlog,
    updateBlog,
    getAdminBlogs,
    getUserBlogs,
    getPendingUserBlogs,
    deleteBlog
};
