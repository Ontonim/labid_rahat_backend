
import { Router } from "express";
import { userController } from "./user.controller";



const router = Router();

router.post(
    "/",
    userController.createNewUser
)
router.get(
    "/",
    userController.getAllUsers
);
router.patch(
  "/approval",
 
  userController.updateModeratorApprovalStatus
);

router.get(
    "/:id",
    userController.getSingleUser
);
router.get("/role/:role", userController.getUsersByRole);

router.patch(
  "/:id",
 
  userController.updateUser
);
router.patch(
  "/:id/status",
  userController.updateAccountStatus
);

router.patch(
  "/:id/role",
  userController.updateUserRole
);


export const  UserRoutes = router;
