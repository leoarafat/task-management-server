import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import paginationFields from '../../../constants/pagination';
import { TaskService } from './task.service';
import { taskFilterableFields } from './task.constants';

//! Create Task
const createTask: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await TaskService.createTask(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Task created successfully`,
      data: result,
    });
  },
);
//! Get Tasks
const getTasks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, taskFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await TaskService.getTasks(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
//! Update board
const updateTask: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result = await TaskService.updateTask(id, data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Task updated successfully`,
      data: result,
    });
  },
);
//! Delete Task
const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TaskService.deleteTask(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Task deleted successfully',
    data: result,
  });
});
export const TaskController = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
