import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
import { isActive, ModeratorApprovalStatus } from "./user.interface";
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

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await UserService.getAllUsers(req.query as  Record<string, string>);

 SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully",
    data,
    meta
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await UserService.getSingleUser(id);
  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User fetched successfully",
    data: user,
  });
});


const getUsersByRole = catchAsync(async (req: Request, res: Response) => {
  const { role } = req.params;

  const users = await UserService.getUsersByRole(role);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Users with role ${role} fetched successfully`,
    data: users,
  });
});


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


const updateAccountStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.query;

  const updatedUser = await UserService.updateAccountStatus(
    id,
    status as isActive
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully",
    data: updatedUser,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;  
  const updateData = req.body;

  const updatedUser = await UserService.updateUser(userId, updateData);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { role } = req.body;

  const updatedUser = await UserService.updateUserRole(userId, role);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User role updated successfully",
    data: updatedUser,
  });
});
export const userController = {
    getAllUsers,
    getSingleUser,
    getUsersByRole,
    createNewUser,
    updateModeratorApprovalStatus,
    updateAccountStatus,
    updateUser,
  updateUserRole
}