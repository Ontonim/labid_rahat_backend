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
exports.newslatterService = void 0;
const newslatter_model_1 = require("./newslatter.model");
const subscribeEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // check duplicate
    const existing = yield newslatter_model_1.Newsletter.findOne({ email });
    if (existing)
        throw new Error("Email already subscribed.");
    const newSubscription = yield newslatter_model_1.Newsletter.create({ email });
    return newSubscription;
});
const getAllSubscriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    return newslatter_model_1.Newsletter.find().sort({ createdAt: -1 });
});
exports.newslatterService = {
    subscribeEmail,
    getAllSubscriptions,
};
