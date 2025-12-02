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
exports.acceptOrRejectContent = exports.getRequestById = exports.getAllRequests = exports.createRequest = void 0;
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const contentReq_service_1 = require("./contentReq.service");
exports.createRequest = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const contentRequest = yield contentReq_service_1.ContentRequestService.createContentRequest(payload);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Content request submitted successfully",
        data: contentRequest,
    });
}));
// GET - All Requests
exports.getAllRequests = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield contentReq_service_1.ContentRequestService.getAllRequests();
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Requests retrieved successfully",
        data: requests,
    });
}));
// GET - Single Request
exports.getRequestById = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const request = yield contentReq_service_1.ContentRequestService.getRequestById(id);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: request ? 200 : 404,
        success: !!request,
        message: request ? "Request retrieved successfully" : "Request not found",
        data: request,
    });
}));
// PATCH - Accept/Reject Request
exports.acceptOrRejectContent = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.query;
    const request = yield contentReq_service_1.ContentRequestService.acceptOrRejectContent(id, status);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: request ? 200 : 404,
        success: !!request,
        message: request ? "Request updated successfully" : "Request not found",
        data: request,
    });
}));
