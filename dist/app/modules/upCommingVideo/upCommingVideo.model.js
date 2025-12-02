"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpcomingVideoModel = void 0;
// video.model.ts
const mongoose_1 = require("mongoose");
const videoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    releaseDate: { type: Date, required: true },
    Imageurl: { type: String },
    isPublished: { type: Boolean, default: false },
}, { timestamps: true });
exports.UpcomingVideoModel = (0, mongoose_1.model)("UpcomingVideo", videoSchema);
