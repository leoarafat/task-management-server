/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../../errors/Apierror';
import { Board } from './board.model';

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
  const isExist = await Board.findById(id);
  if (isExist) {
    throw new ApiError(404, 'Board does not found');
  }
  const result = await Board.create(payload);

  return result;
};
export const BoardService = {
  createBoard,
  updateBoard,
};
