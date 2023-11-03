import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { BoardService } from './board.service';
import sendResponse from '../../../shared/sendResponse';

//! Create Board
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
//! Update board
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
//! Delete Board
const deleteBoard = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BoardService.deleteBoard(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Board deleted successfully',
    data: result,
  });
});
export const BoardController = {
  createBoard,
  updateBoard,
  deleteBoard,
};
