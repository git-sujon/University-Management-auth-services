import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';

const app = express();

app.use(cors());

//  parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes

app.use('/api/v1/', routers);

app.use(globalErrorHandler);

export default app;
