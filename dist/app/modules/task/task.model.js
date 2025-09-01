"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const task_interface_1 = require("./task.interface");
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: Object.values(task_interface_1.TaskStatus), default: task_interface_1.TaskStatus.PENDING },
    priority: { type: String, enum: Object.values(task_interface_1.TaskPriority), default: task_interface_1.TaskPriority.MEDIUM },
    dueDate: { type: Date },
    attachments: [{ type: String }],
    completedAt: { type: Date },
    notes: { type: String },
}, { timestamps: true });
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
