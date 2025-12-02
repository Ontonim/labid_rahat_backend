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
exports.ContentRequestService = void 0;
const contentReq_model_1 = require("./contentReq.model");
// Create new request
const createContentRequest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentReq_model_1.ContentRequestModel.create(payload);
});
// Get all requests
const getAllRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentReq_model_1.ContentRequestModel.find().populate("user", "name email");
});
// Get single request by id
const getRequestById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentReq_model_1.ContentRequestModel.findById(id);
});
// Update request (e.g. accept/reject)
const acceptOrRejectContent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield contentReq_model_1.ContentRequestModel.findByIdAndUpdate(id, { status: payload }, { new: true });
});
exports.ContentRequestService = {
    createContentRequest,
    getAllRequests,
    getRequestById,
    acceptOrRejectContent,
};
