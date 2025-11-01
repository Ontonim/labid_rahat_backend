
import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../../middleWares/checkAuth";
import { validateRequest } from "../../../middleWares/validateRequest";




const router = Router();

router.post(
    "/",
   checkAuth("admin"),
    userController.createNewUser
)
router.get(
    "/",
    checkAuth("admin"),
    userController.getAllUsers
);

router.get(
    "/public",
  
    userController.getAllLimitedMembers
);

router.get(
    "/:id",
    checkAuth("admin","user","member"),
    userController.getSingleUser
);
router.get("/role/:role",
   checkAuth("admin"),
   userController.getUsersByRole);

router.patch(
  "/:id",
  checkAuth("admin"),

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
router.patch(
  "/delete/:id",
  checkAuth("admin"),
  userController.deleteUser
);

export const  UserRoutes = router;
