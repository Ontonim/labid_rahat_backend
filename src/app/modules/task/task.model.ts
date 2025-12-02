import { Schema, model } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignee: [
      {
        name: { type: String, required: false },
        email: { type: String, required: true },
        role: { type: String, required: false },
      },
    ],
    status: {
      type: String,
      enum: ["to do", "in progress", "completed"],
      default: "to do",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const Task = model("Task", taskSchema);
