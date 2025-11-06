"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignee: [
        {
            name: String,
            email: String,
            role: String,
        },
    ],
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    dueDate: { type: Date },
}, { timestamps: true });
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
