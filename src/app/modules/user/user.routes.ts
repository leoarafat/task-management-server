import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

//!
router.post(
  '/signup',
  validateRequest(UserValidation.create),
  UserController.createUser,
);
//!
router.get('/:id', auth(ENUM_USER_ROLE.USER), UserController.getSingleUser);

//!
router.patch(
  '/edit-profile/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.USER),
  UserController.updateUser,
);
//!
router.delete('/:id', auth(ENUM_USER_ROLE.USER), UserController.deleteUser);

export const UserRoutes = router;
