import express from "express";
import {  acceptOrRejectContent, createRequest, getAllRequests, getRequestById } from "./contentReq.controller";
import { checkAuth } from "../../../middleWares/checkAuth";
import { validateRequest } from "../../../middleWares/validateRequest";
import { createContentRequestValidation, updateContentRequestValidation } from "./contentRequest.validation";

const router = express.Router();

router.post("/",checkAuth("user"), validateRequest(createContentRequestValidation), createRequest);
router.patch("/",checkAuth("admin"), validateRequest(updateContentRequestValidation), acceptOrRejectContent);
router.get("/",checkAuth("moderator","admin"), getAllRequests);
router.get("/:id",checkAuth("user"), getRequestById);


export const ContentRequestRoutes = router;
