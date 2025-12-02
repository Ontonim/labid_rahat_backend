import express from "express";
import { createComment, deleteComment, getAllComments, updateCommentStatus } from "./comment.controller";
import { checkAuth } from "../../../middleWares/checkAuth";

const router = express.Router();

// ✅ Public
router.post("/", createComment);

// 🔐 Admin only
router.get("/", checkAuth("admin"), getAllComments);
router.patch("/:id", checkAuth("admin"), updateCommentStatus);
router.patch("/delete/:id", checkAuth("admin"), deleteComment);

export const CommentRoutes = router;
