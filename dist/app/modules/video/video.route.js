"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../../middleWares/checkAuth");
const video_controller_1 = require("./video.controller");
const video_validation_1 = require("./video.validation");
const validateRequest_1 = require("../../../middleWares/validateRequest");
const router = express_1.default.Router();
router.post("/", (0, checkAuth_1.checkAuth)("admin", "moderator"), (0, validateRequest_1.validateRequest)(video_validation_1.videoSchema), video_controller_1.VideoController.createVideo);
router.get("/", (0, checkAuth_1.checkAuth)("user", "moderator", "admin"), video_controller_1.VideoController.getVideos);
router.patch("/:id", (0, checkAuth_1.checkAuth)("admin", "moderator"), (0, validateRequest_1.validateRequest)(video_validation_1.updateVideoValidation), video_controller_1.VideoController.updateVideo);
router.delete("/:id", (0, checkAuth_1.checkAuth)("admin", "moderator"), video_controller_1.VideoController.deleteVideo);
exports.VideoRoutes = router;
