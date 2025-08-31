import { Request, Response } from "express";

import { VideoServices } from "./video.service";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";

const createVideo = catchAsync(async (req: Request, res: Response) => {
  const result = await VideoServices.createVideo(req.body);

  SendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Video uploaded successfully!",
    data: result,
  });
});

const getVideos = catchAsync(async (req: Request, res: Response) => {
  const result = await VideoServices.getVideos(req.query as Record<string, string>);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Videos fetched successfully!",
    data: result.data,
    meta: result.meta,
  });
});

export const updateVideo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await VideoServices.updateVideo(id, req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Video updated successfully",
    data: result,
  });
});

const deleteVideo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedVideo = await VideoServices.deleteVideoById(id);

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Video deleted successfully",
    data: deletedVideo,
  });
});
export const VideoController = {
  createVideo,
  getVideos,
  updateVideo,
  deleteVideo,
};
