import { z } from 'zod';
import { BoardEnum } from './board.constants';

const create = z.object({
  body: z.object({
    boardName: z.string({
      required_error: 'boardName  is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    boardName: z.string({}).optional(),

    boardColumns: z
      .enum([...Object.values(BoardEnum)] as [string, ...string[]])
      .optional(),
  }),
});

export const BoardValidation = {
  create,
  update,
};
