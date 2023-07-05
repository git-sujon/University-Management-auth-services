import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ManagementDepartmentController.UpdateManagementDepartmentController
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  ManagementDepartmentController.deleteManagementDepartmentController
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  ManagementDepartmentController.getSingleManagementDepartmentController
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  ManagementDepartmentController.getAllManagementDepartmentController
);
router.post(
  '/',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ManagementDepartmentController.createManagementDepartmentController
);

export const managementDepartmentRoute = router;
