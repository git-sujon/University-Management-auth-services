import express from 'express';
import { StudentController } from './student.controller';
import { studentValidation } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentValidation),
  StudentController.updateStudentController
);
router.get('/:id', StudentController.getSingleStudentController);
router.get('/', StudentController.getAllStudentController);

router.delete('/', StudentController.deleteStudentController);

export const studentsRoute = router;
