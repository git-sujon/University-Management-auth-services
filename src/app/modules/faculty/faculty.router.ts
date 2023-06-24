import express from 'express';
import { FacultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(facultyValidation.updateFacultyValidation),
  FacultyController.updateFacultyController
);
router.get('/:id', FacultyController.getSingleFacultyController);
router.get('/', FacultyController.getAllFacultyController);
router.delete('/:id', FacultyController.deleteFacultyController);

export const facultyRoute = router;
