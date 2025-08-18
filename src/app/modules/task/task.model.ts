import { Schema, model } from "mongoose";
import { ITask, TaskStatus, TaskPriority } from "./task.interface";

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.PENDING },
    priority: { type: String, enum: Object.values(TaskPriority), default: TaskPriority.MEDIUM },
    dueDate: { type: Date },
    attachments: [{ type: String }],
    completedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);
