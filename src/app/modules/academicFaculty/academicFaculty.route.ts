import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFaculty),
  AcademicFacultyController.UpdateFacultyController
);
router.delete('/:id', AcademicFacultyController.deleteFacultyController);
router.get('/:id', AcademicFacultyController.getSingleFacultyController);
router.get('/', AcademicFacultyController.getAllFacultyController);
router.post(
  '/',
  validateRequest(AcademicFacultyValidation.createAcademicFaculty),
  AcademicFacultyController.createFacultyController
);

export const academicFacultyRoute = router;
