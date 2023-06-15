import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
  academicSemesterController.createSemesterController
);

router.get('/:id', academicSemesterController.getSingleSemesterController);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterSchema),
  academicSemesterController.updateSemesterController
);
router.get('/', academicSemesterController.getAllSemesterController);

export const academicSemesterRoute = router;
