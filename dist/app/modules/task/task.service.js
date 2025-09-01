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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_model_1 = require("./task.model");
// Create a new Task
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.create(payload);
    return task;
});
// Get all Tasks
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_model_1.Task.find()
        .populate("assignedBy", "name email")
        .populate("assignedTo", "name email");
    return tasks;
});
// Get single Task by id
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findById(id)
        .populate("assignedBy", "name email")
        .populate("assignedTo", "name email");
    return task;
});
// Update Task by id
const updateTask = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
        .populate("assignedBy", "name email")
        .populate("assignedTo", "name email");
    return task;
});
exports.TaskService = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
};
