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
exports.sendNewsletterUpdate = exports.subscribeNewsletter = void 0;
const newslatter_model_1 = require("./newslatter.model");
const nodeMailer_1 = require("../../../utils/nodeMailer");
const newslatter_emailTamplate_1 = require("./newslatter.emailTamplate");
const catchAsync_1 = require("../../../utils/catchAsync");
const sendResponse_1 = require("../../../utils/sendResponse");
const newslatter_service_1 = require("./newslatter.service");
exports.subscribeNewsletter = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
        return (0, sendResponse_1.SendResponse)(res, {
            success: false,
            message: "Invalid email address.",
            data: null,
            statusCode: 400,
        });
    }
    const subscription = yield newslatter_service_1.newslatterService.subscribeEmail(email);
    // Send thank you email
    try {
        const html = (0, newslatter_emailTamplate_1.generateThankYouEmail)(email);
        yield (0, nodeMailer_1.sendMailToUser)(email, "Thank You for Subscribing!", html);
    }
    catch (err) {
        console.error("Error sending email:", err);
    }
    (0, sendResponse_1.SendResponse)(res, {
        success: true,
        message: "Subscription successful.",
        data: subscription,
        statusCode: 201,
    });
}));
exports.sendNewsletterUpdate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, message } = req.body;
    // validation
    if (!subject || typeof subject !== "string" || !message || typeof message !== "string") {
        return (0, sendResponse_1.SendResponse)(res, {
            success: false,
            message: "Subject and message are required.",
            data: null,
            statusCode: 400,
        });
    }
    const subscribers = yield newslatter_model_1.Newsletter.find({}, "email");
    if (!subscribers.length) {
        return (0, sendResponse_1.SendResponse)(res, {
            success: false,
            message: "No subscribers found.",
            data: null,
            statusCode: 404,
        });
    }
    const html = (0, newslatter_emailTamplate_1.generateNewsletterEmail)(message);
    for (const sub of subscribers) {
        yield (0, nodeMailer_1.sendMailToUser)(sub.email, subject, html);
    }
    (0, sendResponse_1.SendResponse)(res, {
        success: true,
        message: "Newsletter update sent to all subscribers.",
        data: { totalSent: subscribers.length },
        statusCode: 200,
    });
}));
