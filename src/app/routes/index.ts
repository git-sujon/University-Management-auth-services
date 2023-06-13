import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: userRoute,
  },
  {
    path: '/academic-Semesters/',
    route: academicSemesterRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
