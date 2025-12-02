"use strict";
// video.service.ts
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
exports.upCommingVideoService = void 0;
const upCommingVideo_model_1 = require("./upCommingVideo.model");
const createUpcomingVideoUpdate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield upCommingVideo_model_1.UpcomingVideoModel.create(payload);
});
const getUpcomingVideos = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    return yield upCommingVideo_model_1.UpcomingVideoModel.find({ releaseDate: { $gt: today } })
        .sort({ releaseDate: 1 });
});
exports.upCommingVideoService = {
    createUpcomingVideoUpdate,
    getUpcomingVideos,
};
