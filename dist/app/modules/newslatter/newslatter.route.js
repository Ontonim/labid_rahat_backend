"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const newslatter_controller_1 = require("./newslatter.controller");
const router = express_1.default.Router();
router.post("/", newslatter_controller_1.subscribeNewsletter);
router.post("/send-update", newslatter_controller_1.sendNewsletterUpdate);
exports.NewsletterRoutes = router;
