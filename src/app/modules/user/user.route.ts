import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidation.createUserSchema),
  UserController.createUserController
);

router.get('/', UserController.getAllUserController);

export const userRoute = router;
