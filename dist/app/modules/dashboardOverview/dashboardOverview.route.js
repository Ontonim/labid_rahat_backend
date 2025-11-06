"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dashboardOverview_controller_1 = require("./dashboardOverview.controller");
const router = express_1.default.Router();
router.get("/", dashboardOverview_controller_1.dashboardController.getDashboardOverview);
exports.DashboardRoutes = router;
