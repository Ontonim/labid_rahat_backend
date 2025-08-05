import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);


export const AuthRoutes = router;
