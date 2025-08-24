import express from "express";
import { BlogController } from "./blogs.controller";

const router = express.Router();


router.post("/admin", BlogController.createBlogByAdmin);
router.get("/admin", BlogController.getAdminBlogs);


router.post("/user", BlogController.submitBlogByUser);
router.get("/user/approvedBlog", BlogController.getUserBlogs);

router.patch("/update", BlogController.updateBlog);



router.get("/user/pending", BlogController.getPendingUserBlogs);

router.delete("/deleteBlog/:id", BlogController.deleteBlog);

router.patch("/admin/approve/:id", BlogController.approveBlog);


export const BlogRoutes = router;
