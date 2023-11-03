import { Schema, model } from 'mongoose';
import { BoardEnum } from './board.constants';
import { IBoard } from './board.interface';

// room Schema
const BoardSchema = new Schema<IBoard>(
  {
    boardName: {
      type: String,

      require: true,
    },
    boardColumns: {
      type: String,
      enum: BoardEnum,
      require: true,
    },

    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
export const Board = model('Board', BoardSchema);
