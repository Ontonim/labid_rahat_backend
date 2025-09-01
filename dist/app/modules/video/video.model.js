"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const mongoose_1 = require("mongoose");
const ContributorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: {
        type: String,
        enum: ["video editor", "content writer", "thumbnail designer", "admin"],
        required: true,
    },
}, { _id: false });
const VideoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    youtubeLink: { type: String, required: true },
    contributors: { type: [ContributorSchema], required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Video = (0, mongoose_1.model)("Video", VideoSchema);
