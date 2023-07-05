import express from 'express';
import { AdminController } from './admin.controller';
import { adminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(adminValidation.updateAdminValidation),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.updateAdminController
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getSingleAdminController
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AdminController.getAllAdminController
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteAdminController
);

export const adminRoute = router;
