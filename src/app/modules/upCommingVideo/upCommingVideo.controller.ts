// video.controller.ts
import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
import {upCommingVideoService } from "./upCommingVideo.service";


export const createUpCommingVideoUpdate = catchAsync(async (req: Request, res: Response) => {
  const video = await upCommingVideoService.createUpcomingVideoUpdate(req.body);

  SendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Video created successfully",
    data: video,
  });
});

export const getUpcomingVideos = catchAsync(async (req: Request, res: Response) => {
  const videos = await upCommingVideoService.getUpcomingVideos();

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Upcoming videos fetched successfully",
    data: videos,
  });
});
