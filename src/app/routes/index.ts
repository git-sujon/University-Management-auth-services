import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';

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

  {
    path: '/academic-faculty/',
    route: academicFacultyRoute,
  },

  {
    path: '/academic-department/',
    route: academicDepartmentRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
