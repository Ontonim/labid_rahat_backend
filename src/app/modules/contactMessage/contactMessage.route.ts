import express from "express";
import { ContactController } from "./contactMessage.controller";
import { checkAuth } from "../../../middleWares/checkAuth";

const router = express.Router();

router.post("/", ContactController.createMessage);

router.get("/", checkAuth("admin"), ContactController.getAllMessages);

export const ContactRoutes = router;
