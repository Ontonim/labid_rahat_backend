import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, getTasksByAssignee,  updateTask } from "./task.controller";
import { checkAuth } from "../../../middleWares/checkAuth";



const router = Router();

router.post("/", checkAuth("admin"), createTask);
router.get("/", checkAuth("admin"), getAllTasks);
router.get("/email", checkAuth("member"), getTasksByAssignee);

router.get("/:id", checkAuth("member", "admin"), getTaskById);
router.patch("/:id", checkAuth("member","admin"), updateTask);
router.delete("/:id", checkAuth("member","admin"), deleteTask);

export const TaskRoutes = router;
