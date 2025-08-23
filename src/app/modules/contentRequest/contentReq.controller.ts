import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
import { ContentRequestService } from "./contentReq.service";
import { ContentRequestStatus } from "./contentReq.interface";


export const createRequest = catchAsync(async (req: Request, res: Response) => {
  const payload =req.body;

  const contentRequest = await ContentRequestService.createContentRequest(payload);

  SendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Content request submitted successfully",
    data: contentRequest,
  });
});

// GET - All Requests
export const getAllRequests = catchAsync(async (req: Request, res: Response) => {
  const requests = await ContentRequestService.getAllRequests();

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Requests retrieved successfully",
    data: requests,
  });
});

// GET - Single Request
export const getRequestById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.query as { id: string };
  const request = await ContentRequestService.getRequestById(id);

  SendResponse(res, {
    statusCode: request ? 200 : 404,
    success: !!request,
    message: request ? "Request retrieved successfully" : "Request not found",
    data: request,
  });
});

// PATCH - Accept/Reject Request
export const acceptOrRejectContent = catchAsync(async (req: Request, res: Response) => {
  const { id, status } = req.query as { id: string; status: ContentRequestStatus };

  const request = await ContentRequestService.acceptOrRejectContent(id, status);

  SendResponse(res, {
    statusCode: request ? 200 : 404,
    success: !!request,
    message: request ? "Request updated successfully" : "Request not found",
    data: request,
  });
});
