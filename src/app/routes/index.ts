import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BoardRoutes } from '../modules/board/board.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/board',
    route: BoardRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
