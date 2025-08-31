import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../../middleWares/checkAuth";

const router = Router();

router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post("/reset-password",checkAuth("user","admin","moderator"), authController.resetPassword);

export const AuthRoutes = router;
