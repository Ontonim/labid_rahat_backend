export type TaskStatus = "to do" | "in progress" | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export type Assignee = {
  name: string;
  email: string;
  role: string;
  image?: string;
};

export interface ITask extends Document {
  title: string;
  description?: string;
  assignee: Assignee[];
  status: TaskStatus;       // overall task status
  priority: TaskPriority;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
