"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardOverviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const dashboardOverview_controller_1 = require("./dashboardOverview.controller");
const checkAuth_1 = require("../../../middleWares/checkAuth");
const router = express_1.default.Router();
router.get("/", (0, checkAuth_1.checkAuth)("admin"), dashboardOverview_controller_1.dashboardController.getDashboardOverview);
exports.DashboardOverviewRoutes = router;
