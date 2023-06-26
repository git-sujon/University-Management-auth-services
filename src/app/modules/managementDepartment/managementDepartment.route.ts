import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentSchema
  ),
  ManagementDepartmentController.UpdateManagementDepartmentController
);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartmentController
);
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartmentController
);
router.get(
  '/',
  ManagementDepartmentController.getAllManagementDepartmentController
);
router.post(
  '/',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentSchema
  ),
  ManagementDepartmentController.createManagementDepartmentController
);

export const managementDepartmentRoute = router;
