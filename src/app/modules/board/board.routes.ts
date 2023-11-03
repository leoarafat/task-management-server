import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { validateRequest } from '../../middlewares/validateRequest';
import { BoardController } from './board.controller';
import { BoardValidation } from './board.validations';

const router = express.Router();

// router.get('/', auth(ENUM_USER_ROLE.USER), BoardController.getBoards);

router.post(
  '/create-board',
  validateRequest(BoardValidation.create),
  auth(ENUM_USER_ROLE.USER),
  BoardController.createBoard,
);
router.patch(
  '/update-board/:id',
  validateRequest(BoardValidation.update),
  auth(ENUM_USER_ROLE.USER),
  BoardController.updateBoard,
);
// router.get('/:id', CategoryController.getSIngleCategory);
router.delete('/:id', auth(ENUM_USER_ROLE.USER), BoardController.deleteBoard);
export const BoardRoutes = router;
