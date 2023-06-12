import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { userRoute } from './app/modules/user/user.route';
import { academicSemesterRoute } from './app/modules/academicSemester/academicSemester.route';

const app = express();

app.use(cors());

//  parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes

app.use('/api/v1/users/', userRoute);
app.use('/api/v1/academic-Semesters/', academicSemesterRoute);

// // test route
// app.get('/', (req: Request, res: Response, next:NextFunction) => {
//  throw new Error ("Test New Error ")

// })

// global error

app.use(globalErrorHandler);

export default app;
