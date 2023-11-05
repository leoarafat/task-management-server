import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { TaskController } from './task.controller';

const router = express.Router();

router.get('/my-tasks', auth(ENUM_USER_ROLE.USER), TaskController.getTasks);

router.post(
  '/create-task',

  auth(ENUM_USER_ROLE.USER),
  TaskController.createTask,
);
// router.get('/my-tasks', auth(ENUM_USER_ROLE.USER), TaskController.getMyTasks);
router.patch(
  '/update-task/:id',

  auth(ENUM_USER_ROLE.USER),
  TaskController.updateTask,
);

router.delete('/:id', auth(ENUM_USER_ROLE.USER), TaskController.deleteTask);
export const TaskRoutes = router;
