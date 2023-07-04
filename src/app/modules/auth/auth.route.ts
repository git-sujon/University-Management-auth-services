import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUserController
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshTokenController
);
router.post(
  '/change-password',
  validateRequest(AuthValidation.changePasswordSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AuthController.changePasswordController
);

export const authRoute = router;
