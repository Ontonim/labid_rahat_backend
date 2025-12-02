"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String },
    access: { type: String, default: "member" },
    expertise: [{ type: String }],
    image: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    status: { type: String, enum: Object.values(user_interface_1.isActive), default: user_interface_1.isActive.ACTIVE },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, optional: true },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
