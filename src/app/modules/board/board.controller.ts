import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import { BoardService } from './board.service';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { boardFilterableFields } from './board.constants';
import paginationFields from '../../../constants/pagination';

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
//! Get boards
const getBoards = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, boardFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await BoardService.getBoards(filters, paginationOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Board retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
//! Get my boards
const getMyBoards = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await BoardService.getMyBoards(user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My Board retrieved successfully',
    data: result,
  });
});
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
  getBoards,
  updateBoard,
  deleteBoard,
  getMyBoards,
};
