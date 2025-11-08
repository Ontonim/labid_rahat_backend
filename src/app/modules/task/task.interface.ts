import { Types } from "mongoose";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent"
}



export type Assignee = {
  name: string;
  email: string;
  role: string;
};


export interface ITask extends Document {
  title: string;
  description?: string;
  assignee: Assignee[];       // Multiple users can be assigned
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITaskAssignment {
  title: string;
  description: string;
  assignedTo: Types.ObjectId | string;
  priority: TaskPriority;
  dueDate?: Date;
  attachments?: string[];
}
