/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/Apierror';
import { Task } from '../task/task.model';

import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { ITask, ITaskFilters } from './task.interface';
import { taskSearchableFields } from './task.constants';
import { Board } from '../board/board.model';

//! Create task
const createTask = async (payload: any) => {
  const boardId = payload.board;
  const board = await Board.findById(boardId);
  // console.log(board);
  if (!board) {
    throw new ApiError(404, 'board not found');
  }
  const result = (await Task.create(payload)).populate('board');
  //@ts-ignore
  board?.tasks?.push((await result)._id);
  await board.save();
  return result;
};
//! Get Task
const getTasks = async (
  filters: ITaskFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<any[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: taskSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Task.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('board');

  const total = await Task.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
//! Get my tasks
const getMyTasks = async (user: any) => {
  const tasks = await Task.find({ user: user?.userId });

  if (!tasks) {
    throw new ApiError(404, 'tasks not found');
  }
  return tasks;
};
//!Update Task
const updateTask = async (id: string, payload: any) => {
  const isExist = await Task.findById({ _id: id });
  if (!isExist) {
    throw new ApiError(404, 'Task does not found');
  }
  const updatedTaskData: Partial<ITask> = { ...payload };

  const result = await Task.findOneAndUpdate(
    {
      _id: id,
    },
    updatedTaskData,
    {
      new: true,
    },
  );

  return result;
};

//! Delete Task
const deleteTask = async (id: string) => {
  const task = await Task.findByIdAndDelete({ _id: id });
  //   console.log(Task);
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
};
export const TaskService = {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  getMyTasks,
};
