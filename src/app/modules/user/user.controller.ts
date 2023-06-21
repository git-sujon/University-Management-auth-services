import { Request, Response } from 'express';
import { UserServices } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;

  const result = await UserServices.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Successfully',
    data: result,
  });
});

const getAllUserController = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users Retrieved Successfully',
    data: result,
  });
});

export const UserController = {
  createUserController,
  getAllUserController,
};
