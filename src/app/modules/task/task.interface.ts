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

export interface ITask {
  _id?: string;
  title: string;
  description: string;
  assignedBy: Types.ObjectId | string;
  assignedTo: Types.ObjectId | string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  attachments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  completedAt?: Date;
  notes?: string;
}

export interface ITaskAssignment {
  title: string;
  description: string;
  assignedTo: Types.ObjectId | string;
  priority: TaskPriority;
  dueDate?: Date;
  attachments?: string[];
}
