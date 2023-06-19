import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFecultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.patch('/:id', AcademicFacultyController.UpdateFacultyController);
router.delete('/:id', AcademicFacultyController.deleteFacultyController);
router.get('/:id', AcademicFacultyController.getSingleFacultyController);
router.get('/', AcademicFacultyController.getAllFacultyController);
router.post(
  '/',
  validateRequest(AcademicFecultyValidation.createAcademicFaculty),
  AcademicFacultyController.createFacultyController
);

export const academicFacultyRoute = router;
