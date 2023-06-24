import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createStudentSchema),
  UserController.createStudentController
);
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultySchema),
  UserController.createFacultyController
);

router.get('/', UserController.getAllUserController);

export const userRoute = router;
