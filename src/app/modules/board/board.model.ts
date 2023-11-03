import { Schema, model } from 'mongoose';
import { BoardEnum } from './board.constants';

// room Schema
const BoardSchema = new Schema(
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
export const Category = model('Board', BoardSchema);
