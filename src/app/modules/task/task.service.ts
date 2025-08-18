import { Task } from "./task.model";
import { ITask } from "./task.interface";

// Create a new Task
const createTask = async (payload: ITask) => {
  const task = await Task.create(payload);
  return task;
};

// Get all Tasks
const getAllTasks = async () => {
  const tasks = await Task.find()
    .populate("assignedBy", "name email")   
    .populate("assignedTo", "name email");
  return tasks;
};

// Get single Task by id
const getTaskById = async (id: string) => {
  const task = await Task.findById(id)
    .populate("assignedBy", "name email")
    .populate("assignedTo", "name email");
  return task;
};

// Update Task by id
const updateTask = async (id: string, payload: Partial<ITask>) => {
  const task = await Task.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .populate("assignedBy", "name email")
    .populate("assignedTo", "name email");

  return task;
};

export const TaskService = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
};
