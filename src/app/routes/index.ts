import express from 'express';
import { userRoute } from '../modules/user/user.route';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { studentsRoute } from '../modules/student/student.router';
import { facultyRoute } from '../modules/faculty/faculty.router';
import { adminRoute } from '../modules/admin/admin.router';
import { managementDepartmentRoute } from '../modules/managementDepartment/managementDepartment.route';
import { authRoute } from '../modules/auth/auth.route';

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
  {
    path: '/students/',
    route: studentsRoute,
  },
  {
    path: '/faculty/',
    route: facultyRoute,
  },
  {
    path: '/admin/',
    route: adminRoute,
  },
  {
    path: '/management-department/',
    route: managementDepartmentRoute,
  },
  {
    path: '/auth/',
    route: authRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
