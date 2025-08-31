import express from "express";
import { BlogController } from "./blogs.controller";
import { checkAuth } from "../../../middleWares/checkAuth";
import { validateRequest } from "../../../middleWares/validateRequest";
import { createBlogByAdminValidation, submitBlogByUserValidation, updateBlogValidation } from "./blogs.validation";

const router = express.Router();


router.post("/admin",checkAuth("admin","moderator"),validateRequest(createBlogByAdminValidation), BlogController.createBlogByAdmin);
router.get("/admin",checkAuth("admin","moderator"), BlogController.getAdminBlogs);


router.post("/user",checkAuth("user","moderator"),validateRequest(submitBlogByUserValidation), BlogController.submitBlogByUser);
router.get("/user/approvedBlog",checkAuth("user","admin","moderator"), BlogController.getUserBlogs);

router.patch("/update",checkAuth("user","admin","moderator"),validateRequest(updateBlogValidation), BlogController.updateBlog);



router.get("/user/pending", checkAuth("admin"), BlogController.getPendingUserBlogs);

router.delete("/deleteBlog/:id",checkAuth("admin","moderator"), BlogController.deleteBlog);

router.patch("/admin/approve/:id",checkAuth("admin"), BlogController.approveBlog);


export const BlogRoutes = router;
