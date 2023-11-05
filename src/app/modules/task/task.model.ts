import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },

    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Todo', 'Doing', 'Done'],
      default: 'Todo',
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedUsers: [
      {
        type: String,
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
export const Task = model('Task', TaskSchema);
