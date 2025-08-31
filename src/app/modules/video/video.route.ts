import express from "express";
import { checkAuth } from "../../../middleWares/checkAuth";
import { VideoController } from "./video.controller";
import { updateVideoValidation, videoSchema } from "./video.validation";
import { validateRequest } from "../../../middleWares/validateRequest";

const router = express.Router();
router.post("/", checkAuth("admin", "moderator"),validateRequest(videoSchema), VideoController.createVideo);
router.get("/", checkAuth("user", "moderator", "admin"), VideoController.getVideos);
router.patch("/:id", checkAuth("admin", "moderator"), validateRequest(updateVideoValidation), VideoController.updateVideo);
router.delete("/:id", checkAuth("admin", "moderator"), VideoController.deleteVideo);
export const VideoRoutes = router;
