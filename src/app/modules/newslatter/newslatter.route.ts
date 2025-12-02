import express from "express";
import { sendNewsletterUpdate, subscribeNewsletter } from "./newslatter.controller";
const router = express.Router();
router.post("/", subscribeNewsletter);
router.post("/send-update", sendNewsletterUpdate); 
export const NewsletterRoutes = router;
