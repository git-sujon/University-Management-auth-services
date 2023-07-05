import express from 'express';
import { FacultyController } from './faculty.controller';
import { facultyValidation } from './faculty.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(facultyValidation.updateFacultyValidation),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyController.updateFacultyController
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  FacultyController.getSingleFacultyController
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  FacultyController.getAllFacultyController
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyController.deleteFacultyController
);

export const facultyRoute = router;
