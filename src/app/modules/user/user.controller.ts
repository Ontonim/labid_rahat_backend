import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
import { isActive } from "./user.interface";
import { UserService } from "./user.service";
import httpStatus from "http-status-codes";

// ✅ Create new user (with optional image upload)
const createNewUser = catchAsync(async (req: Request, res: Response) => {

 const memberData = req.body;
 const user = await UserService.createNewUser(memberData);

  SendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

// ✅ Update existing user (with new image upload if provided)
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

// ✅ Other controllers (unchanged)
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await UserService.getAllUsers(
    req.query as Record<string, string>
  );
  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully",
    data,
    meta,
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

const getAllLimitedMembers = catchAsync(async (req: Request, res: Response) => {
  const members = await UserService.getAllLimitedMembers();
  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Limited members fetched successfully",
    data: members,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const deletedUser = await UserService.deleteUser(userId);
  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
});

export const userController = {
  createNewUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  getUsersByRole,
  getAllLimitedMembers,
  updateAccountStatus,
  updateUserRole,
  deleteUser,
};
