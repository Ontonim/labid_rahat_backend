"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const comment_inteface_1 = require("./comment.inteface");
const commentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
    blogId: { type: String, required: true },
    status: { type: String, enum: Object.values(comment_inteface_1.CommentStatus), default: comment_inteface_1.CommentStatus.PENDING },
    approved: { type: Boolean, default: false },
    isdeleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Comment = (0, mongoose_1.model)("Comment", commentSchema);
