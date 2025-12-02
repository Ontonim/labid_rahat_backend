"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.Task = (0, mongoose_1.model)("Task", taskSchema);
