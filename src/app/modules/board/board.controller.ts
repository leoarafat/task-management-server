import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { BoardService } from './board.service';
import sendResponse from '../../../shared/sendResponse';

//!
const createBoard: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;

    const result = await BoardService.createBoard(data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Board created successfully`,
      data: result,
    });
  },
);
const updateBoard: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result = await BoardService.updateBoard(id, data);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: `Board updated successfully`,
      data: result,
    });
  },
);
export const BoardController = {
  createBoard,
  updateBoard,
};
