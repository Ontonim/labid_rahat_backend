import express from "express";
import { createUpCommingVideoUpdate, getUpcomingVideos } from "./upCommingVideo.controller";

const router = express.Router();

router.post("/", createUpCommingVideoUpdate);
router.get("/", getUpcomingVideos);

export const UpcomingVideoRoutes = router;
