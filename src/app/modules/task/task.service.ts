import { Task } from "./task.model";
import { ITask } from "./task.interface";
import { User } from "../user/user.model"; // user collection import
import { sendMailToUser } from "../../../utils/nodeMailer";

const createTask = async (payload: ITask) => {
  const { assignee, ...rest } = payload;

  if (!assignee || !Array.isArray(assignee) || assignee.length === 0) {
    throw new Error("Assignee emails are required.");
  }

  const task = await Task.create({
    ...rest,
    assignee,
  });

  const populatedAssignee = await Promise.all(
    task.assignee.map(async (a) => {
      const user = await User.findOne({ email: a.email }).select("name email role");
      return {
        email: a.email,
        name: user?.name || "N/A",
        role: user?.role || "N/A",
      };
    })
  );

  for (const a of populatedAssignee) {
    const html = `
      <div style="font-family: sans-serif; background: #f4f9f6; padding: 20px;">
        <h2>🗂️ New Task Assigned</h2>
        <p>Hello ${a.name || "User"},</p>
        <p>You have been assigned a new task: <strong>${task.title}</strong></p>
        <p>Status: ${task.status}</p>
        <p>Priority: ${task.priority}</p>
      </div>
    `;
    await sendMailToUser(a.email as string, `🗂️ New Task Assigned: ${task.title}`, html);
  }

  return {
    ...task.toObject(),
    assignee: populatedAssignee,
  };
};

const getAllTasks = async () => {
  const tasks = await Task.find();

  const populatedTasks = await Promise.all(
    tasks.map(async (task) => {
      const populatedAssignee = await Promise.all(
        task.assignee.map(async (a) => {
          const user = await User.findOne({ email: a.email }).select("name email role");
          return {
            email: a.email,
            name: user?.name || "N/A",
            role: user?.role || "N/A",
          };
        })
      );
      return {
        ...task.toObject(),
        assignee: populatedAssignee,
      };
    })
  );

  return populatedTasks;
};

const getTaskById = async (id: string) => {
  const task = await Task.findById(id);
  if (!task) throw new Error("Task not found");

  const populatedAssignee = await Promise.all(
    task.assignee.map(async (a) => {
      const user = await User.findOne({ email: a.email }).select("name email role");
      return {
        email: a.email,
        name: user?.name || "N/A",
        role: user?.role || "N/A",
      };
    })
  );

  return {
    ...task.toObject(),
    assignee: populatedAssignee,
  };
};

// ✅ Update Task
const updateTask = async (id: string, payload: Partial<ITask>) => {
  const task = await Task.findByIdAndUpdate(id, payload, { new: true });
  if (!task) throw new Error("Task not found");

  // Populate again after update
  const populatedAssignee = await Promise.all(
    task.assignee.map(async (a) => {
      const user = await User.findOne({ email: a.email }).select("name email role");
      return {
        email: a.email,
        name: user?.name || "N/A",
        role: user?.role || "N/A",
      };
    })
  );

  return {
    ...task.toObject(),
    assignee: populatedAssignee,
  };
};

// ✅ Delete Task
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
