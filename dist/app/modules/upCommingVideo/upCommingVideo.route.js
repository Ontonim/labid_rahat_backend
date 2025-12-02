"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingVideoRoutes = void 0;
const express_1 = __importDefault(require("express"));
const upCommingVideo_controller_1 = require("./upCommingVideo.controller");
const checkAuth_1 = require("../../../middleWares/checkAuth");
const validateRequest_1 = require("../../../middleWares/validateRequest");
const upCommingVideo_validation_1 = require("./upCommingVideo.validation");
const router = express_1.default.Router();
// POST route (create upcoming video)
router.post("/", (0, checkAuth_1.checkAuth)("admin", "moderator"), (0, validateRequest_1.validateRequest)(upCommingVideo_validation_1.createUpcomingVideoValidation), upCommingVideo_controller_1.createUpCommingVideoUpdate);
// GET route (fetch upcoming videos)
router.get("/", (0, checkAuth_1.checkAuth)("user", "moderator", "admin"), upCommingVideo_controller_1.getUpcomingVideos);
exports.UpcomingVideoRoutes = router;
