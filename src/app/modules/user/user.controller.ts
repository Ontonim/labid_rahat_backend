import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
import { ModeratorApprovalStatus } from "./user.interface";
import { UserService } from "./user.service";
import AppError from "../../../helpers/AppError";
import httpStatus from 'http-status-codes';


const createNewUser = catchAsync(async (req,res)=>{
 const user = await UserService.createNewUser(req.body);




    SendResponse(res,{
        statusCode: 201,
        success: true,
        message: "User created successfully",
        data: user 
    })
})

const updateModeratorApprovalStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.query.id as string;
  const approvalStatus = req.query.status as string;

  if (
    approvalStatus !== ModeratorApprovalStatus.ACCEPTED &&
    approvalStatus !==  ModeratorApprovalStatus.REJECTED
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status query param");
  }

  const updatedUser = await UserService.updateModeratorApprovalStatus(
    userId,
    approvalStatus as ModeratorApprovalStatus
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Agent ${approvalStatus}`,
    data: updatedUser,
  });
});


export const userController = {
    createNewUser,
    updateModeratorApprovalStatus
  
}