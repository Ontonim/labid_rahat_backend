import express from "express";
import { dashboardController } from "./dashboardOverview.controller";
const router = express.Router();

router.get("/", dashboardController.getDashboardOverview);

export const DashboardRoutes = router;
