import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUserController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    const result = await userServices.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
    next();
  }
);

export const userController = {
  createUserController,
};
