import { Request, Response } from "express";
import { TaskService } from "./task.service";
import { catchAsync } from "../../../utils/catchAsync";
import { SendResponse } from "../../../utils/sendResponse";


// POST - Create Task


export const createTask = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

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
  const { id } = req.params;

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
  const { id } = req.params;

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
export const deleteTask = catchAsync(async(req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return SendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Task id is required in query",
      data: null,
    });
  }
  const deletedTask = await TaskService.deleteTask(id);

  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task deleted successfully",
    data: deletedTask,
  });
})