import { Types } from 'mongoose';
import { IBoard } from '../board/board.interface';

type BoardEnum = 'Todo' | 'Doing' | 'Done';

export type ITask = {
  title: string;
  description: string;
  status: BoardEnum;
  board: Types.ObjectId | IBoard;
};
