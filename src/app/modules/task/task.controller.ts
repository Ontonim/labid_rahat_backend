import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";
import { User } from "../user/user.model";

// POST - Create Task



export const createTask = catchAsync(async (req: Request, res: Response) => {
  const { assignedBy, assignedTo } = req.query;

  if (!assignedBy || typeof assignedBy !== "string") {
    return SendResponse(res, {
      statusCode: 400,
      success: false,
      message: "assignedBy user id is required in query",
      data: null,
    });
  }

  if (!assignedTo || typeof assignedTo !== "string") {
    return SendResponse(res, {
      statusCode: 400,
      success: false,
      message: "assignedTo user id is required in query",
      data: null,
    });
  }

  const assignerExists = await User.findById(assignedBy);
  if (!assignerExists) {
    return SendResponse(res, {
      statusCode: 404,
      success: false,
      message: "AssignedBy user not found",
      data: null,
    });
  }

  const assigneeExists = await User.findById(assignedTo);
  if (!assigneeExists) {
    return SendResponse(res, {
      statusCode: 404,
      success: false,
      message: "AssignedTo user not found",
      data: null,
    });
  }

  const payload = {
    ...req.body,
    assignedBy,
    assignedTo,
  };

  const task = await TaskService.createTask(payload);

  SendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created successfully",
    data: task,
  });
});



// GET - All Tasks
export const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const tasks = await TaskService.getAllTasks();

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks retrieved successfully",
    data: tasks,
  });
});

// GET - Single Task (id from query)
export const getTaskById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.query; 

  if (!id || typeof id !== "string") {
    return SendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Task id is required in query",
      data: null,
    });
  }

  const task = await TaskService.getTaskById(id);

  if (!task) {
    return SendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Task not found",
      data: null,
    });
  }

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task retrieved successfully",
    data: task,
  });
});


export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return SendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Task id is required in query",
      data: null,
    });
  }

  const updatedTask = await TaskService.updateTask(id, req.body);

  if (!updatedTask) {
    return SendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Task not found",
      data: null,
    });
  }

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task updated successfully",
    data: updatedTask,
  });
});
