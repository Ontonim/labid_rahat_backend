"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const contentReq_controller_1 = require("./contentReq.controller");
const checkAuth_1 = require("../../../middleWares/checkAuth");
const validateRequest_1 = require("../../../middleWares/validateRequest");
const contentRequest_validation_1 = require("./contentRequest.validation");
const router = express_1.default.Router();
router.post("/", (0, checkAuth_1.checkAuth)("user"), (0, validateRequest_1.validateRequest)(contentRequest_validation_1.createContentRequestValidation), contentReq_controller_1.createRequest);
router.patch("/", (0, checkAuth_1.checkAuth)("admin"), (0, validateRequest_1.validateRequest)(contentRequest_validation_1.updateContentRequestValidation), contentReq_controller_1.acceptOrRejectContent);
router.get("/", (0, checkAuth_1.checkAuth)("moderator", "admin"), contentReq_controller_1.getAllRequests);
router.get("/:id", (0, checkAuth_1.checkAuth)("user"), contentReq_controller_1.getRequestById);
exports.ContentRequestRoutes = router;
