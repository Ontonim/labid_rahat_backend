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
exports.CommentService = void 0;
const comment_model_1 = require("./comment.model");
const comment_inteface_1 = require("./comment.inteface");
const QueryBuilder_1 = require("../../../utils/QueryBuilder");
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = yield comment_model_1.Comment.create(Object.assign(Object.assign({}, payload), { status: comment_inteface_1.CommentStatus.PENDING, approved: false }));
    return newComment;
});
const getAllComments = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // QueryBuilder instance
    const qb = new QueryBuilder_1.QueryBuilder(comment_model_1.Comment.find().populate("blogId", "title"), query);
    // filter, search, sort, fields, paginate
    qb.filter().search(["name", "email", "comment"]).sort().fields().paginate();
    // Build query
    const comments = yield qb.build();
    // meta info
    const meta = yield qb.getMeta();
    return { comments, meta };
});
const updateCommentStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const approved = status === comment_inteface_1.CommentStatus.APPROVED;
    const updated = yield comment_model_1.Comment.findByIdAndUpdate(id, { status: status, approved }, { new: true, runValidators: true });
    if (!updated)
        throw new Error("Comment not found");
    return updated;
});
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield comment_model_1.Comment.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return deleted;
});
exports.CommentService = {
    createComment,
    getAllComments,
    updateCommentStatus,
    deleteComment
};
