import { Schema, model } from "mongoose";
const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignee: [
      {
        name: String,
        email: String,
        role: String,
      },
    ],
    status: { type: String, enum: ["to do", "in progress", "completed", "due"], default: "to do" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    dueDate: { type: Date },
  },
  { timestamps: true }
);


export const Task = model("Task", taskSchema);