import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequest(academicSemesterValidation.academicSemesterSchema),
  academicSemesterController.createAcademicSemesterController
);

router.get(
  '/get-all-academic-semester',
  // validateRequest(academicSemesterValidation.academicSemesterSchema),
  academicSemesterController.getAllAcademicSemesterController
);

export const academicSemesterRoute = router;
