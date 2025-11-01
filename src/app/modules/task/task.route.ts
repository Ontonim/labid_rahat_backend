import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "./task.controller";
import { checkAuth } from "../../../middleWares/checkAuth";



const router = Router();

router.post("/", checkAuth("admin"), createTask);
router.get("/", checkAuth("admin"), getAllTasks);
router.get("/:id", checkAuth("moderator", "admin"), getTaskById);
router.patch("/:id", checkAuth("moderator","admin"), updateTask);
router.delete("/:id", checkAuth("moderator","admin"), deleteTask);

export const TaskRoutes = router;
