import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequest(academicSemesterValidation.createAcademicSemesterSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.createSemesterController
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  academicSemesterController.getSingleSemesterController
);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation.updateAcademicSemesterSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.updateSemesterController
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  academicSemesterController.deleteSemesterController
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  academicSemesterController.getAllSemesterController
);

export const academicSemesterRoute = router;
