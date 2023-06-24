import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createStudentValidationSchema),
  UserController.createStudentController
);
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyValidationSchema),
  UserController.createFacultyController
);
router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminValidationSchema),
  UserController.createAdminController
);

router.get('/', UserController.getAllUserController);

export const userRoute = router;
