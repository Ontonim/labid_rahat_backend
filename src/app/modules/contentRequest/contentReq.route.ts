import express from "express";
import {  acceptOrRejectContent, createRequest, getAllRequests, getRequestById } from "./contentReq.controller";

const router = express.Router();

router.post("/", createRequest);
router.patch("/", acceptOrRejectContent);
router.get("/", getAllRequests);
router.get("/:id", getRequestById);


export const ContentRequestRoutes = router;
