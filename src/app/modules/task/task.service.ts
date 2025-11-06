import { Task } from "./task.model";
import { ITask } from "./task.interface";
import { sendMailToUser } from "../../../utils/nodeMailer";

type Assignee = {
  name: string;
  email: string;
  role: string;
};
const createTask = async (payload: ITask) => {
  const { assignee, ...rest } = payload;

  // Assignee validation
  if (!assignee || !Array.isArray(assignee) || assignee.length === 0) {
    throw new Error("Assignee emails are required.");
  }

  // Save task in DB
  const taskData = {
    ...rest,
    assignee: assignee,
  };

  const task = await Task.create(taskData);

  // Extract emails from assignee objects
  const assigneeEmails: string[] = assignee.map((a: Assignee) => a.email);

  // Send bottle green themed email to each assignee
  for (const email of assigneeEmails) {
    const html = `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f9f6; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #004d40, #006a4e); color: white; text-align: center; padding: 25px;">
          <h2 style="margin: 0;">🗂️ New Task Assigned</h2>
        </div>
        <div style="padding: 25px; color: #1f2937;">
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 15px;">You have been assigned a new task. Here are the details:</p>

          <div style="margin-top: 15px; background: #f3f4f6; padding: 15px; border-radius: 8px;">
            <p><strong>Title:</strong> ${task.title}</p>
            <p><strong>Description:</strong> ${task.description || "No description provided."}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            ${
              task.dueDate
                ? `<p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>`
                : ""
            }
          </div>

          <p style="margin-top: 25px; font-size: 14px; color: #374151;">
            Please check your dashboard for more details.
          </p>

           

          <p style="font-size: 12px; color: #6b7280; margin-top: 30px; text-align: center;">
            Sent automatically by Task Management System — ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>`;

    await sendMailToUser(email, `🗂️ New Task Assigned: ${task.title}`, html);
  }

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
    .populate("assignee", "name email")
  

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
