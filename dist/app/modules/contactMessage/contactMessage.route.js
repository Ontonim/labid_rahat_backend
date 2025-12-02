"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRoutes = void 0;
const express_1 = __importDefault(require("express"));
const contactMessage_controller_1 = require("./contactMessage.controller");
const checkAuth_1 = require("../../../middleWares/checkAuth");
const router = express_1.default.Router();
router.post("/", contactMessage_controller_1.ContactController.createMessage);
router.get("/", (0, checkAuth_1.checkAuth)("admin"), contactMessage_controller_1.ContactController.getAllMessages);
exports.ContactRoutes = router;
