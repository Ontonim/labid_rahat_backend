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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const user_service_1 = require("./user.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// ✅ Create new user (with optional image upload)
const createNewUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberData = req.body;
    const user = yield user_service_1.UserService.createNewUser(memberData);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: user,
    });
}));
// ✅ Update existing user (with new image upload if provided)
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const updateData = req.body;
    const updatedUser = yield user_service_1.UserService.updateUser(userId, updateData);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "User updated successfully",
        data: updatedUser,
    });
}));
// ✅ Other controllers (unchanged)
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, meta } = yield user_service_1.UserService.getAllUsers(req.query);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Users fetched successfully",
        data,
        meta,
    });
}));
const getAllMemberEamil = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emails = yield user_service_1.UserService.getAllMemberEamil();
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Member emails fetched successfully",
        data: emails,
    });
}));
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_service_1.UserService.getSingleUser(id);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "User fetched successfully",
        data: user,
    });
}));
const getUsersByRole = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.params;
    const users = yield user_service_1.UserService.getUsersByRole(role);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: `Users with role ${role} fetched successfully`,
        data: users,
    });
}));
const updateAccountStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.query;
    const updatedUser = yield user_service_1.UserService.updateAccountStatus(id, status);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "User status updated successfully",
        data: updatedUser,
    });
}));
const updateUserRole = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { role } = req.body;
    const updatedUser = yield user_service_1.UserService.updateUserRole(userId, role);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "User role updated successfully",
        data: updatedUser,
    });
}));
const getAllLimitedMembers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const members = yield user_service_1.UserService.getAllLimitedMembers();
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Limited members fetched successfully",
        data: members,
    });
}));
const deleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const deletedUser = yield user_service_1.UserService.deleteUser(userId);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
    });
}));
exports.userController = {
    createNewUser,
    updateUser,
    getAllUsers,
    getSingleUser,
    getUsersByRole,
    getAllLimitedMembers,
    updateAccountStatus,
    updateUserRole,
    deleteUser,
    getAllMemberEamil
};
