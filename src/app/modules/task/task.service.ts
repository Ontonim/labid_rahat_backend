import { Task } from "./task.model";
import { ITask, Assignee } from "./task.interface";
import { User } from "../user/user.model"; // user collection import
import { sendMailToUser } from "../../../utils/nodeMailer";
import { QueryBuilder } from "../../../utils/QueryBuilder";

// ✅ Create Task
const createTask = async (payload: ITask) => {
  const { assignee, ...rest } = payload;

  if (!assignee || assignee.length === 0) {
    throw new Error("Assignee emails are required.");
  }

  const task = await Task.create({
    ...rest,
    assignee,
  });

  const populatedAssignee: (Assignee & { image?: string })[] = await Promise.all(
    task.assignee.map(async (a: { email: string; name?: string | null; role?: string | null }) => {
      const user = await User.findOne({ email: a.email }).select("name email role");
      return {
        email: a.email,
        name: user?.name || a.name || "N/A",
        role: user?.role || a.role || "N/A",
      };
    })
  );

  for (const a of populatedAssignee) {
    const html = `
      <div style="font-family: sans-serif; background: #f4f9f6; padding: 20px;">
        <h2>🗂️ New Task Assigned</h2>
        <p>Hello ${a.name},</p>
        <p>You have been assigned a new task: <strong>${task.title}</strong></p>
        <p>Status: ${task.status}</p>
        <p>Priority: ${task.priority}</p>
      </div>
    `;
    await sendMailToUser(a.email, `🗂️ New Task Assigned: ${task.title}`, html);
  }

  return {
    ...task.toObject(),
    assignee: populatedAssignee,
  };
};

// ✅ Get all tasks
const getAllTasks = async () => {
  const tasks = await Task.find();

  const populatedTasks = await Promise.all(
    tasks.map(async (task) => {
      const populatedAssignee: (Assignee & { image?: string })[] = await Promise.all(
        task.assignee.map(async (a: { email: string; name?: string | null; role?: string | null }) => {
          const user = await User.findOne({ email: a.email }).select("name email role image");
          return {
            email: a.email,
            name: user?.name || a.name || "N/A",
            role: user?.role || a.role || "N/A",
            image: user?.image || "N/A",
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

// ✅ Get task by ID
const getTaskById = async (id: string) => {
  const task = await Task.findById(id);
  if (!task) throw new Error("Task not found");

  const populatedAssignee: (Assignee & { image?: string })[] = await Promise.all(
    task.assignee.map(async (a: { email: string; name?: string | null; role?: string | null }) => {
      const user = await User.findOne({ email: a.email }).select("name email role image");
      return {
        email: a.email,
        name: user?.name || a.name || "N/A",
        role: user?.role || a.role || "N/A",
        image: user?.image || "N/A",
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

  const populatedAssignee: (Assignee & { image?: string })[] = await Promise.all(
    task.assignee.map(async (a: { email: string; name?: string | null; role?: string | null }) => {
      const user = await User.findOne({ email: a.email }).select("name email role image");
      return {
        email: a.email,
        name: user?.name || a.name || "N/A",
        role: user?.role || a.role || "N/A",
        image: user?.image || "N/A",
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
  if (!task) throw new Error("Task not found or already deleted.");
  return task;
};

// ✅ Get tasks by assignee email
const getTasksByAssignee = async (email: string, query: Record<string, any>) => {
  const baseQuery = { "assignee.email": email };
  const qb = new QueryBuilder(Task.find(baseQuery), query)
    .search(["title", "description"])
    .filter()
    .sort()
    .paginate();

  const tasks = await qb.build();

  // Populate assignees
  const populatedTasks = await Promise.all(
    tasks.map(async (task) => {
      const populatedAssignee: (Assignee & { image?: string })[] = await Promise.all(
        task.assignee.map(async (a: { email: string; name?: string | null; role?: string | null }) => {
          const user = await User.findOne({ email: a.email }).select("name email role image");
          return {
            email: a.email,
            name: user?.name || a.name || "N/A",
            role: user?.role || a.role || "N/A",
            image: user?.image || "N/A",
          };
        })
      );
      return { ...task.toObject(), assignee: populatedAssignee };
    })
  );

  const totalDocuments = await Task.countDocuments(baseQuery);
  const page = query.page ? parseInt(query.page) : 1;
  const limit = query.limit ? parseInt(query.limit) : 10;
  const totalPages = Math.ceil(totalDocuments / limit);

  const meta = { total: totalDocuments, page, limit, totalPages };

  return { meta, data: populatedTasks };
};

export const TaskService = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByAssignee,
};
