import { Task } from "./task.model";
import { ITask } from "./task.interface";
import { User } from "../user/user.model";


const createTask = async (payload: ITask) => {
  const { assignee, ...rest } = payload;

  // Step 1: validate if assignee emails are provided
  if (!assignee || !Array.isArray(assignee) || assignee.length === 0) {
    throw new Error("Assignee emails are required.");
  }

  // Step 2: find users by their email addresses
  const users = await User.find({ email: { $in: assignee } }).select("name email role");

  if (users.length === 0) {
    throw new Error("No valid users found for the provided assignee emails.");
  }

  // Step 3: create a new task with full user info
  const taskData = {
    ...rest,
    assignee: users,
  };

  const task = await Task.create(taskData);
  return task;
};


// Get all Tasks
const getAllTasks = async () => {
  const tasks = await Task.find()

  return tasks;
};

// Get single Task by id
const getTaskById = async (id: string) => {
  const task = await Task.findById(id)
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
const deleteTask = async (id: string) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw new Error("Task not found or already deleted.");
  }
  return task;
};
export const TaskService = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
