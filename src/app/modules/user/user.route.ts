
import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../../middleWares/checkAuth";
import { validateRequest } from "../../../middleWares/validateRequest";
import { createUserValidation, updateUserValidation } from "./user.validation";



const router = Router();

router.post(
    "/",
    validateRequest(createUserValidation),
    userController.createNewUser
)
router.get(
    "/",
    checkAuth("admin"),
    userController.getAllUsers
);
router.patch(
  "/approval",
  checkAuth("admin"),
  userController.updateModeratorApprovalStatus
);

router.get(
    "/:id",
    checkAuth("admin","user","moderator"),
    userController.getSingleUser
);
router.get("/role/:role",
   checkAuth("admin"),
   userController.getUsersByRole);

router.patch(
  "/:id",
  checkAuth("admin"),
  validateRequest(updateUserValidation),
  userController.updateUser
);
router.patch(
  "/:id/status",
  checkAuth("admin"),
  userController.updateAccountStatus
);

router.patch(
  "/:id/role",
  checkAuth("admin"),
  userController.updateUserRole
);


export const  UserRoutes = router;
