"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidation = exports.createUserValidation = void 0;
const z = __importStar(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createUserValidation = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters"),
    email: z.string()
        .email("Invalid email address"),
    password: z.string()
        .min(6, "Password must be at least 6 characters"),
    picture: z.string()
        .url("Invalid image URL")
        .optional(),
    role: z.enum([user_interface_1.Role.USER, user_interface_1.Role.ADMIN, user_interface_1.Role.MODERATOR, user_interface_1.Role.PENDING]).optional(),
    isActive: z.enum([user_interface_1.isActive.ACTIVE, user_interface_1.isActive.INACTIVE, user_interface_1.isActive.BLOCKED]).optional(),
    isVerified: z.boolean().optional(),
});
exports.updateUserValidation = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters")
        .optional(),
    email: z.string()
        .email("Invalid email address")
        .optional(),
    picture: z.string()
        .url("Invalid image URL")
        .optional(),
    isActive: z.enum([user_interface_1.isActive.ACTIVE, user_interface_1.isActive.INACTIVE, user_interface_1.isActive.BLOCKED])
        .optional(),
    isVerified: z.boolean().optional(),
});
