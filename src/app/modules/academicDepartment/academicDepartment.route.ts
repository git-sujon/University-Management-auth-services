import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateAcademicDepartment),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.UpdateDepartmentController
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.deleteDepartmentController
);
router.get('/:id', AcademicDepartmentController.getSingleDepartmentController);
router.get('/', AcademicDepartmentController.getAllDepartmentController);
router.post(
  '/',
  validateRequest(AcademicDepartmentValidation.createAcademicDepartment),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.createDepartmentController
);

export const academicDepartmentRoute = router;
