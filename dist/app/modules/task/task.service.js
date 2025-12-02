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
const user_model_1 = require("../user/user.model"); // user collection import
const nodeMailer_1 = require("../../../utils/nodeMailer");
const QueryBuilder_1 = require("../../../utils/QueryBuilder");
// ✅ Create Task
const createTask = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignee } = payload, rest = __rest(payload, ["assignee"]);
    if (!assignee || assignee.length === 0) {
        throw new Error("Assignee emails are required.");
    }
    const task = yield task_model_1.Task.create(Object.assign(Object.assign({}, rest), { assignee }));
    const populatedAssignee = yield Promise.all(task.assignee.map((a) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({ email: a.email }).select("name email role");
        return {
            email: a.email,
            name: (user === null || user === void 0 ? void 0 : user.name) || a.name || "N/A",
            role: (user === null || user === void 0 ? void 0 : user.role) || a.role || "N/A",
        };
    })));
    for (const a of populatedAssignee) {
        const html = `
      <div style="font-family: sans-serif; background: #f4f9f6; padding: 20px;">
        <h2>🗂️ New Task Assigned</h2>
        <p>Hello ${a.name},</p>
        <p>You have been assigned a new task: <strong>${task.title}</strong></p>
        <p>Status: ${task.status}</p>
        <p>Priority: ${task.priority}</p>
      </div>
    `;
        yield (0, nodeMailer_1.sendMailToUser)(a.email, `🗂️ New Task Assigned: ${task.title}`, html);
    }
    return Object.assign(Object.assign({}, task.toObject()), { assignee: populatedAssignee });
});
// ✅ Get all tasks
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_model_1.Task.find();
    const populatedTasks = yield Promise.all(tasks.map((task) => __awaiter(void 0, void 0, void 0, function* () {
        const populatedAssignee = yield Promise.all(task.assignee.map((a) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ email: a.email }).select("name email role image");
            return {
                email: a.email,
                name: (user === null || user === void 0 ? void 0 : user.name) || a.name || "N/A",
                role: (user === null || user === void 0 ? void 0 : user.role) || a.role || "N/A",
                image: (user === null || user === void 0 ? void 0 : user.image) || "N/A",
            };
        })));
        return Object.assign(Object.assign({}, task.toObject()), { assignee: populatedAssignee });
    })));
    return populatedTasks;
});
// ✅ Get task by ID
const getTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findById(id);
    if (!task)
        throw new Error("Task not found");
    const populatedAssignee = yield Promise.all(task.assignee.map((a) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({ email: a.email }).select("name email role image");
        return {
            email: a.email,
            name: (user === null || user === void 0 ? void 0 : user.name) || a.name || "N/A",
            role: (user === null || user === void 0 ? void 0 : user.role) || a.role || "N/A",
            image: (user === null || user === void 0 ? void 0 : user.image) || "N/A",
        };
    })));
    return Object.assign(Object.assign({}, task.toObject()), { assignee: populatedAssignee });
});
// ✅ Update Task
const updateTask = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findByIdAndUpdate(id, payload, { new: true });
    if (!task)
        throw new Error("Task not found");
    const populatedAssignee = yield Promise.all(task.assignee.map((a) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.User.findOne({ email: a.email }).select("name email role image");
        return {
            email: a.email,
            name: (user === null || user === void 0 ? void 0 : user.name) || a.name || "N/A",
            role: (user === null || user === void 0 ? void 0 : user.role) || a.role || "N/A",
            image: (user === null || user === void 0 ? void 0 : user.image) || "N/A",
        };
    })));
    return Object.assign(Object.assign({}, task.toObject()), { assignee: populatedAssignee });
});
// ✅ Delete Task
const deleteTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_model_1.Task.findByIdAndDelete(id);
    if (!task)
        throw new Error("Task not found or already deleted.");
    return task;
});
// ✅ Get tasks by assignee email
const getTasksByAssignee = (email, query) => __awaiter(void 0, void 0, void 0, function* () {
    const baseQuery = { "assignee.email": email };
    const qb = new QueryBuilder_1.QueryBuilder(task_model_1.Task.find(baseQuery), query)
        .search(["title", "description"])
        .filter()
        .sort()
        .paginate();
    const tasks = yield qb.build();
    // Populate assignees
    const populatedTasks = yield Promise.all(tasks.map((task) => __awaiter(void 0, void 0, void 0, function* () {
        const populatedAssignee = yield Promise.all(task.assignee.map((a) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_model_1.User.findOne({ email: a.email }).select("name email role image");
            return {
                email: a.email,
                name: (user === null || user === void 0 ? void 0 : user.name) || a.name || "N/A",
                role: (user === null || user === void 0 ? void 0 : user.role) || a.role || "N/A",
                image: (user === null || user === void 0 ? void 0 : user.image) || "N/A",
            };
        })));
        return Object.assign(Object.assign({}, task.toObject()), { assignee: populatedAssignee });
    })));
    const totalDocuments = yield task_model_1.Task.countDocuments(baseQuery);
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const totalPages = Math.ceil(totalDocuments / limit);
    const meta = { total: totalDocuments, page, limit, totalPages };
    return { meta, data: populatedTasks };
});
exports.TaskService = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    getTasksByAssignee,
};
