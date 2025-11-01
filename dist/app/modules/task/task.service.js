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
const user_model_1 = require("../user/user.model");
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignee } = payload, rest = __rest(payload, ["assignee"]);
    // Step 1: validate if assignee emails are provided
    if (!assignee || !Array.isArray(assignee) || assignee.length === 0) {
        throw new Error("Assignee emails are required.");
    }
    // Step 2: find users by their email addresses
    const users = yield user_model_1.User.find({ email: { $in: assignee } }).select("name email role");
    if (users.length === 0) {
        throw new Error("No valid users found for the provided assignee emails.");
    }
    // Step 3: create a new task with full user info
    const taskData = Object.assign(Object.assign({}, rest), { assignee: users });
    const task = yield task_model_1.Task.create(taskData);
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
