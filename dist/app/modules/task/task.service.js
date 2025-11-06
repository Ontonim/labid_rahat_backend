"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_model_1 = require("./task.model");
const nodeMailer_1 = require("../../../utils/nodeMailer");
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignee } = payload, rest = __rest(payload, ["assignee"]);
    // Assignee validation
    if (!assignee || !Array.isArray(assignee) || assignee.length === 0) {
        throw new Error("Assignee emails are required.");
    }
    // Save task in DB
    const taskData = Object.assign(Object.assign({}, rest), { assignee: assignee });
    const task = yield task_model_1.Task.create(taskData);
    // Extract emails from assignee objects
    const assigneeEmails = assignee.map((a) => a.email);
    // Send bottle green themed email to each assignee
    for (const email of assigneeEmails) {
        const html = `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f9f6; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #004d40, #006a4e); color: white; text-align: center; padding: 25px;">
          <h2 style="margin: 0;">🗂️ New Task Assigned</h2>
        </div>
        <div style="padding: 25px; color: #1f2937;">
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 15px;">You have been assigned a new task. Here are the details:</p>

          <div style="margin-top: 15px; background: #f3f4f6; padding: 15px; border-radius: 8px;">
            <p><strong>Title:</strong> ${task.title}</p>
            <p><strong>Description:</strong> ${task.description || "No description provided."}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            ${task.dueDate
            ? `<p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>`
            : ""}
          </div>

          <p style="margin-top: 25px; font-size: 14px; color: #374151;">
            Please check your dashboard for more details.
          </p>

           

          <p style="font-size: 12px; color: #6b7280; margin-top: 30px; text-align: center;">
            Sent automatically by Task Management System — ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>`;
        yield (0, nodeMailer_1.sendMailToUser)(email, `🗂️ New Task Assigned: ${task.title}`, html);
    }
    return task;
});
// Get all Tasks
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_model_1.Task.find();
    return tasks;
});
// Get single Task by id
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findById(id);
    return task;
});
// Update Task by id
const updateTask = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
        .populate("assignee", "name email");
    return task;
});
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findByIdAndDelete(id);
    if (!task) {
        throw new Error("Task not found or already deleted.");
    }
    return task;
});
exports.TaskService = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
