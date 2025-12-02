"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("./comment.controller");
const checkAuth_1 = require("../../../middleWares/checkAuth");
const router = express_1.default.Router();
// ✅ Public
router.post("/", comment_controller_1.createComment);
// 🔐 Admin only
router.get("/", (0, checkAuth_1.checkAuth)("admin"), comment_controller_1.getAllComments);
router.patch("/:id", (0, checkAuth_1.checkAuth)("admin"), comment_controller_1.updateCommentStatus);
router.patch("/delete/:id", (0, checkAuth_1.checkAuth)("admin"), comment_controller_1.deleteComment);
exports.CommentRoutes = router;
