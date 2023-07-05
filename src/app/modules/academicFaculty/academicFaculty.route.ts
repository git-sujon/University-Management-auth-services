import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',

  validateRequest(AcademicFacultyValidation.createAcademicFaculty),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createFacultyController
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicFacultyController.getSingleFacultyController
);
router.patch(
  '/:id',

  validateRequest(AcademicFacultyValidation.updateAcademicFaculty),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.UpdateFacultyController
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteFacultyController
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.getAllFacultyController
);

export const academicFacultyRoute = router;
