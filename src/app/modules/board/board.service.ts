/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/Apierror';
import { Task } from '../task/task.model';
import { IBoard, IBoardFilters } from './board.interface';
import { Board } from './board.model';
import { asyncForEach } from '../../../shared/forEach';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { boardSearchableFields } from './board.constants';

//! Create board
const createBoard = async (payload: any) => {
  const { boardName } = payload;
  const isExist = await Board.findOne({ boardName });
  if (isExist) {
    throw new ApiError(400, 'Already Exist this board');
  }
  const result = await Board.create(payload);

  return result;
};
//! Get Boards
const getBoards = async (
  filters: IBoardFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<any[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: boardSearchableFields.map(field => ({
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

  const result = await Board.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Board.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//!Update Board
const updateBoard = async (id: string, payload: any) => {
  const isExist = await Board.findById({ _id: id });
  if (!isExist) {
    throw new ApiError(404, 'Board does not found');
  }
  const updatedBoardData: Partial<IBoard> = { ...payload };

  const result = await Board.findOneAndUpdate(
    {
      _id: id,
    },
    updatedBoardData,
    {
      new: true,
    },
  );

  return result;
};

//! Delete board
const deleteBoard = async (id: string) => {
  const board = await Board.findById({ _id: id });
  //   console.log(board);
  if (!board) {
    throw new ApiError(404, 'Board not found');
  }
  const tasks = await Task.find({ board: id });
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    await asyncForEach(tasks, async (data: any) => {
      await Task.deleteMany({ board: data.board });
    });
    await Board.findByIdAndDelete({ _id: id });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
    throw error;
  }
};
export const BoardService = {
  createBoard,
  updateBoard,
  deleteBoard,
  getBoards,
};
