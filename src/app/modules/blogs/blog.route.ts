import express from "express";

import { BlogsController } from "./blogs.controller";
import { checkAuth } from "../../../middleWares/checkAuth";

const router = express.Router();
// Create blog with image
router.post(
  "/",
  checkAuth("admin"),
  BlogsController.createBlogController
);


router.get("/", BlogsController.getAllBlogsController);
router.get("/:id", BlogsController.getBlogByIdController);
// Update blog with optional image
router.patch(
  "/:id",
  checkAuth("admin"),
  BlogsController.updateBlogController
);
router.delete("/:id", checkAuth("admin"), BlogsController.deleteBlogController);


export const BlogRoutes = router;
