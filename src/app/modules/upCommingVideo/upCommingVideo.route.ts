import express from "express";
import { createUpCommingVideoUpdate, getUpcomingVideos } from "./upCommingVideo.controller";
import { checkAuth } from "../../../middleWares/checkAuth";
import { validateRequest } from "../../../middleWares/validateRequest";
import { createUpcomingVideoValidation } from "./upCommingVideo.validation";

const router = express.Router();

// POST route (create upcoming video)
router.post(
  "/",
  checkAuth("admin", "moderator"),
  validateRequest(createUpcomingVideoValidation),
  createUpCommingVideoUpdate
);

// GET route (fetch upcoming videos)
router.get(
  "/",
  checkAuth("user", "moderator", "admin"),
  getUpcomingVideos
);

export const UpcomingVideoRoutes = router;
