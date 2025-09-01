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
exports.updateTask = exports.getTaskById = exports.getAllTasks = exports.createTask = void 0;
const task_service_1 = require("./task.service");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const user_model_1 = require("../user/user.model");
const nodeMailer_1 = require("../../../utils/nodeMailer");
// POST - Create Task
exports.createTask = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignedBy, assignedTo } = req.query;
    if (!assignedBy || typeof assignedBy !== "string") {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "assignedBy user id is required in query",
            data: null,
        });
    }
    if (!assignedTo || typeof assignedTo !== "string") {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 400,
            success: false,
            message: "assignedTo user id is required in query",
            data: null,
        });
    }
    const assignedByExists = yield user_model_1.User.findById(assignedBy);
    if (!assignedByExists) {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "AssignedBy user not found",
            data: null,
        });
    }
    const assignedToExists = yield user_model_1.User.findById(assignedTo);
    if (!assignedToExists) {
        return (0, sendResponse_1.SendResponse)(res, {
            statusCode: 404,
            success: false,
            message: "AssignedTo user not found",
            data: null,
        });
    }
    const payload = Object.assign(Object.assign({}, req.body), { assignedBy,
        assignedTo });
    const task = yield task_service_1.TaskService.createTask(payload);
    //  console.log(assignedToExists.email, "assignedToExists email");
    yield (0, nodeMailer_1.sendMail)(assignedToExists.email, "New Task Assigned", `Hello ${assignedToExists.name},\n\nYou have been assigned a new task: ${task.title}\n\nPlease check your Task Manager dashboard.`);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Task created successfully & email sent",
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
    const { id } = req.query;
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
    const { id } = req.query;
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
