import express from "express";
import { dashboardController } from "./dashboardOverview.controller";
import { checkAuth } from "../../../middleWares/checkAuth";
const router = express.Router();

router.get("/", checkAuth("admin"), dashboardController.getDashboardOverview);

export const DashboardOverviewRoutes = router;
