import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createStudentValidationSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudentController
);
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyValidationSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createFacultyController
);
router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminValidationSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdminController
);

router.get(
  '/',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUserController
);

export const userRoute = router;
