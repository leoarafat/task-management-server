import express, { Application } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { NotFoundHandler } from './errors/NotFoundHandler';

export const app: Application = express();
//cors
app.use(
  cors({
    // origin: ['http://localhost:3000'],
    origin: ['https://task-manager-liart-sigma.vercel.app'],
    credentials: true,
  }),
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//All Routes
app.use('/api/v1', routes);

//Global Error Handler
app.use(globalErrorHandler);

//handle not found
app.use(NotFoundHandler.handle);
