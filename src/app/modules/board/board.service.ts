/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import ApiError from '../../../errors/Apierror';
import { Task } from '../task/task.model';
import { IBoard } from './board.interface';
import { Board } from './board.model';
import { asyncForEach } from '../../../shared/forEach';

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

//!
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
};
