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
exports.VideoServices = void 0;
const QueryBuilder_1 = require("../../../utils/QueryBuilder");
const video_model_1 = require("./video.model");
const createVideo = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const video = yield video_model_1.Video.create(payload);
    return video;
});
const getVideos = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const videoQuery = new QueryBuilder_1.QueryBuilder(video_model_1.Video.find(), query)
        .filter()
        .search(["title", "description", "contributors.name", "contributors.role"])
        .sort()
        .fields()
        .paginate();
    const data = yield videoQuery.build();
    const meta = yield videoQuery.getMeta();
    return { data, meta };
});
const updateVideo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedVideo = yield video_model_1.Video.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedVideo;
});
const deleteVideoById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedVideo = yield video_model_1.Video.findByIdAndDelete(id);
    if (!deletedVideo) {
        throw new Error("Video not found");
    }
    return deletedVideo;
});
exports.VideoServices = {
    createVideo,
    getVideos,
    updateVideo,
    deleteVideoById,
};
