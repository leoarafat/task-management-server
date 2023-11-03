import { Types } from 'mongoose';
import { ITask } from '../task/task.interface';

export type IBoard = {
  boardName: string;
  boardColumns: 'Todo' | 'Doing' | 'Done';
  tasks: Types.ObjectId | ITask;
};

export type IBoardFilters = {
  searchTerm?: string;
  boardName?: string;
};
