
import { Router } from "express";
import { userController } from "./user.controller";



const router = Router();

router.post(
    "/",
    userController.createNewUser
)

router.patch(
  "/approval",
 
  userController.updateModeratorApprovalStatus
);

export const  UserRoutes = router;
