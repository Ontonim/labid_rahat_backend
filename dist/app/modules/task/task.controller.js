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
exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const task_service_1 = require("./task.service");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
// POST - Create Task
exports.createTask = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const task = yield task_service_1.TaskService.createTask(payload);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Task created successfully",
        data: task,
    });
}));
// GET - All Tasks
exports.getAllTasks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_service_1.TaskService.getAllTasks();
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Tasks retrieved successfully",
        data: tasks,
    });
}));
// GET - Single Task (id from query)
exports.getTaskById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "Task id is required in query",
            data: null,
        });
    }
    const task = yield task_service_1.TaskService.getTaskById(id);
    if (!task) {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "Task not found",
            data: null,
        });
    }
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Task retrieved successfully",
        data: task,
    });
}));
exports.updateTask = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "Task id is required in query",
            data: null,
        });
    }
    const updatedTask = yield task_service_1.TaskService.updateTask(id, req.body);
    if (!updatedTask) {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "Task not found",
            data: null,
        });
    }
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
    });
}));
exports.deleteTask = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "Task id is required in query",
            data: null,
        });
    }
    const deletedTask = yield task_service_1.TaskService.deleteTask(id);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Task deleted successfully",
        data: deletedTask,
    });
}));
