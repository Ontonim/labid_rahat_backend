import * as z from "zod";
import { TaskStatus, TaskPriority } from "./task.interface";


export const createTaskValidation = z.object({

    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    assignedBy: z.string().min(1, "assignedBy is required"), // ObjectId as string
    assignedTo: z.string().min(1, "assignedTo is required"), // ObjectId as string
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED])
      .optional(),
    priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH])
      .optional(),
    dueDate: z.string().refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "dueDate must be a valid date string"
    ).optional(),
    attachments: z.array(z.string().url("Invalid attachment URL")).optional(),
    completedAt: z.string().refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "completedAt must be a valid date string"
    ).optional(),
    notes: z.string().optional(),

});


export const updateTaskValidation = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    assignedBy: z.string().min(1, "assignedBy is required").optional(),
    assignedTo: z.string().min(1, "assignedTo is required").optional(),
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED])
      .optional(),
    priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH])
      .optional(),
    dueDate: z.string().refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "dueDate must be a valid date string"
    ).optional(),
    attachments: z.array(z.string().url("Invalid attachment URL")).optional(),
    completedAt: z.string().refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "completedAt must be a valid date string"
    ).optional(),
    notes: z.string().optional(),
  }),
});
