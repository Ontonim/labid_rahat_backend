import { Request, Response } from "express";
import httpStatus from "http-status";
import { ContactService } from "./contactMessage.service";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";

// Public: POST /api/contact
const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.createMessage(req.body);

  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Your message has been successfully sent.",
    data: result,
  });
});

// Admin Only: GET /api/contact
const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.getAllMessages();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All messages retrieved successfully.",
    data: result,
  });
});

export const ContactController = {
  createMessage,
  getAllMessages,
};
