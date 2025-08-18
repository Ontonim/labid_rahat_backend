import { Router } from "express";
import { createTask, getAllTasks, getTaskById, updateTask } from "./task.controller";


const router = Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/", getTaskById);
router.patch("/", updateTask);

export const TaskRoutes = router;
