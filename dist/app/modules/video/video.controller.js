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
exports.VideoController = exports.updateVideo = void 0;
const video_service_1 = require("./video.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const createVideo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield video_service_1.VideoServices.createVideo(req.body);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "Video uploaded successfully!",
        data: result,
    });
}));
const getVideos = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield video_service_1.VideoServices.getVideos(req.query);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Videos fetched successfully!",
        data: result.data,
        meta: result.meta,
    });
}));
exports.updateVideo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield video_service_1.VideoServices.updateVideo(id, req.body);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Video updated successfully",
        data: result,
    });
}));
const deleteVideo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedVideo = yield video_service_1.VideoServices.deleteVideoById(id);
    (0, sendResponse_1.SendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Video deleted successfully",
        data: deletedVideo,
    });
}));
exports.VideoController = {
    createVideo,
    getVideos,
    updateVideo: exports.updateVideo,
    deleteVideo,
};
