"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRequestModel = void 0;
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    subscriberName: { type: String, required: true },
    subscriberEmail: { type: String, required: true },
    topic: { type: String, required: true },
    details: { type: String },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
}, { timestamps: true });
exports.ContentRequestModel = (0, mongoose_1.model)("Request", requestSchema);
