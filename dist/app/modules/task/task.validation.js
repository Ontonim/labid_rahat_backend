"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskValidation = exports.createTaskValidation = void 0;
const z = __importStar(require("zod"));
const task_interface_1 = require("./task.interface");
exports.createTaskValidation = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    assignedBy: z.string().min(1, "assignedBy is required"), // ObjectId as string
    assignedTo: z.string().min(1, "assignedTo is required"), // ObjectId as string
    status: z.enum([task_interface_1.TaskStatus.PENDING, task_interface_1.TaskStatus.IN_PROGRESS, task_interface_1.TaskStatus.COMPLETED])
        .optional(),
    priority: z.enum([task_interface_1.TaskPriority.LOW, task_interface_1.TaskPriority.MEDIUM, task_interface_1.TaskPriority.HIGH])
        .optional(),
    dueDate: z.string().refine((val) => !val || !isNaN(Date.parse(val)), "dueDate must be a valid date string").optional(),
    attachments: z.array(z.string().url("Invalid attachment URL")).optional(),
    completedAt: z.string().refine((val) => !val || !isNaN(Date.parse(val)), "completedAt must be a valid date string").optional(),
    notes: z.string().optional(),
});
exports.updateTaskValidation = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required").optional(),
        description: z.string().min(1, "Description is required").optional(),
        assignedBy: z.string().min(1, "assignedBy is required").optional(),
        assignedTo: z.string().min(1, "assignedTo is required").optional(),
        status: z.enum([task_interface_1.TaskStatus.PENDING, task_interface_1.TaskStatus.IN_PROGRESS, task_interface_1.TaskStatus.COMPLETED])
            .optional(),
        priority: z.enum([task_interface_1.TaskPriority.LOW, task_interface_1.TaskPriority.MEDIUM, task_interface_1.TaskPriority.HIGH])
            .optional(),
        dueDate: z.string().refine((val) => !val || !isNaN(Date.parse(val)), "dueDate must be a valid date string").optional(),
        attachments: z.array(z.string().url("Invalid attachment URL")).optional(),
        completedAt: z.string().refine((val) => !val || !isNaN(Date.parse(val)), "completedAt must be a valid date string").optional(),
        notes: z.string().optional(),
    }),
});
