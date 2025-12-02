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
exports.ContactService = void 0;
const contactMessage_model_1 = require("./contactMessage.model");
const nodeMailer_1 = require("../../../utils/nodeMailer");
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const createMessage = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newMessage = yield contactMessage_model_1.Contact.create(payload);
    const html = `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
      <div style="background: linear-gradient(135deg, #004d40, #006a4e); color: white; text-align: center; padding: 20px;">
        <h2 style="margin: 0;">📩 New Contact Message</h2>
      </div>
      <div style="padding: 25px; color: #374151;">
        <p style="font-size: 16px;"><strong>Name:</strong> ${payload.name}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${payload.email}</p>
        <p style="font-size: 16px;"><strong>Subject:</strong> ${payload.subject}</p>
        <div style="margin-top: 15px; background: #f3f4f6; padding: 15px; border-radius: 8px;">
          <p style="font-size: 15px; line-height: 1.6; color: #111827;">${payload.message}</p>
        </div>
        <p style="font-size: 13px; color: #6b7280; margin-top: 25px; text-align: center;">
          Received on: ${new Date().toLocaleString()}
        </p>
      </div>
    </div>
  </div>`;
    yield (0, nodeMailer_1.sendMailToAdmin)(ADMIN_EMAIL, `New Message from ${payload.name}`, html);
    return newMessage;
});
const getAllMessages = () => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield contactMessage_model_1.Contact.find().sort({ createdAt: -1 });
    return messages;
});
exports.ContactService = {
    createMessage,
    getAllMessages,
};
