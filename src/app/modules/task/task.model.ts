import { Schema, model } from "mongoose";
const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignee: [
      {
        email: String,
      },
    ],
    status: { type: String, enum: ["pending","completed"], default: "pending" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    dueDate: { type: Date },
  },
  { timestamps: true }
);


export const Task = model("Task", taskSchema);