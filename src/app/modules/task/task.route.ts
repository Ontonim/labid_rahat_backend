import { Router } from "express";
import { createTask, getAllTasks, getTaskById, updateTask } from "./task.controller";
import { checkAuth } from "../../../middleWares/checkAuth";
import { validateRequest } from "../../../middleWares/validateRequest";
import { createTaskValidation, updateTaskValidation } from "./task.validation";


const router = Router();

router.post("/", checkAuth("admin"),validateRequest(createTaskValidation), createTask);
router.get("/", checkAuth("admin"), getAllTasks);
router.get("/:id", checkAuth("moderator"), getTaskById);
router.patch("/:id", checkAuth("moderator","admin"), validateRequest(updateTaskValidation), updateTask);

export const TaskRoutes = router;
