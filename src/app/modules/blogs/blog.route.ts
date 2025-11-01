import express from "express";

import { BlogsController } from "./blogs.controller";
import { checkAuth } from "../../../middleWares/checkAuth";

const router = express.Router();

router.get("/", BlogsController.getAllBlogsController);
router.get("/:id", BlogsController.getBlogByIdController);
router.delete("/:id", checkAuth("admin"), BlogsController.deleteBlogController);


export const BlogRoutes = router;
