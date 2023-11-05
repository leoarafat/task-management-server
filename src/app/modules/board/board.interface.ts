import { Types } from 'mongoose';
import { ITask } from '../task/task.interface';
import { IUser } from '../user/user.interface';

export type IBoard = {
  boardName: string;
  boardColumns: 'Todo' | 'Doing' | 'Done';
  tasks: Types.ObjectId | ITask;
  user: Types.ObjectId | IUser;
};

export type IBoardFilters = {
  searchTerm?: string;
  boardName?: string;
};
