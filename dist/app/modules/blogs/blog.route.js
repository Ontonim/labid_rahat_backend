"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const blogs_controller_1 = require("./blogs.controller");
const checkAuth_1 = require("../../../middleWares/checkAuth");
const router = express_1.default.Router();
router.get("/", blogs_controller_1.BlogsController.getAllBlogsController);
router.get("/:id", blogs_controller_1.BlogsController.getBlogByIdController);
router.delete("/:id", (0, checkAuth_1.checkAuth)("admin"), blogs_controller_1.BlogsController.deleteBlogController);
exports.BlogRoutes = router;
