import express from 'express';
import { StudentController } from './student.controller';
import { studentValidation } from './student.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(studentValidation.updateStudentValidation),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentController.updateStudentController
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  StudentController.getSingleStudentController
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  StudentController.getAllStudentController
);

router.delete(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  StudentController.deleteStudentController
);

export const studentsRoute = router;
