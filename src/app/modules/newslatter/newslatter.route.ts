import express from "express";
import { subscribeNewsletter } from "./newslatter.controller";
const router = express.Router();
router.post("/", subscribeNewsletter);
export const NewsletterRoutes = router;
