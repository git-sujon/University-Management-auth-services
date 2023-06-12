import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequest(academicSemesterValidation.academicSemesterSchema)
  //   userController.createUserController
);

export const academicSemesterRoute = router;
