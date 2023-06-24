import express from 'express';
import { AdminController } from './admin.controller';
import { adminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(adminValidation.updateAdminValidation),
  AdminController.updateAdminController
);
router.get('/:id', AdminController.getSingleAdminController);
router.get('/', AdminController.getAllAdminController);
router.delete('/:id', AdminController.deleteAdminController);

export const adminRoute = router;
