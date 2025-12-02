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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const task_model_1 = require("../task/task.model");
const user_model_1 = require("../user/user.model");
const blogs_model_1 = require("../blogs/blogs.model");
const comment_model_1 = require("../comment/comment.model");
const newslatter_model_1 = require("../newslatter/newslatter.model");
const contactMessage_model_1 = require("../contactMessage/contactMessage.model");
const getDashboardOverview = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [pendingTasks, totalMembers, totalSubscribers, totalBlogs, pendingComments, approvedComments, rejectedComments, totalContacts] = yield Promise.all([
        task_model_1.Task.countDocuments({ status: "pending" }),
        user_model_1.User.countDocuments({ isDeleted: false }),
        newslatter_model_1.Newsletter.countDocuments(),
        blogs_model_1.Blog.countDocuments(),
        comment_model_1.Comment.countDocuments({ status: "PENDING" }),
        comment_model_1.Comment.countDocuments({ status: "APPROVED" }),
        comment_model_1.Comment.countDocuments({ status: "REJECTED" }),
        contactMessage_model_1.Contact.countDocuments()
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
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Dashboard overview fetched successfully",
        data: overview
    });
}));
exports.dashboardController = {
    getDashboardOverview,
};
