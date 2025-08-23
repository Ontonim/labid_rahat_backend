import {  ContentRequestStatus, IRequest } from "./contentReq.interface";
import { ContentRequestModel } from "./contentReq.model";

// Create new request
const createContentRequest = async (payload: IRequest) => {
  return await ContentRequestModel.create(payload);
};

// Get all requests
const getAllRequests = async () => {
  return await ContentRequestModel.find().populate("user", "name email");
};

// Get single request by id
const getRequestById = async (id: string) => {
  return await ContentRequestModel.findById(id);
};

// Update request (e.g. accept/reject)
const acceptOrRejectContent = async (id: string, payload: ContentRequestStatus) => {
  return await ContentRequestModel.findByIdAndUpdate(id, { status: payload }, { new: true });
};

export const ContentRequestService = {
  createContentRequest,
  getAllRequests,
  getRequestById,
  acceptOrRejectContent,
};
