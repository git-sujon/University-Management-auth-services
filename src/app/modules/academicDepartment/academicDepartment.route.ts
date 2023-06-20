import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartment),
  AcademicDepartmentController.UpdateDepartmentController
);
router.delete('/:id', AcademicDepartmentController.deleteDepartmentController);
router.get('/:id', AcademicDepartmentController.getSingleDepartmentController);
router.get('/', AcademicDepartmentController.getAllDepartmentController);
router.post(
  '/',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartment),
  AcademicDepartmentController.createDepartmentController
);

export const academicDepartmentRoute = router;
