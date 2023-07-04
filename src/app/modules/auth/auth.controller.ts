import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthServices } from './auth.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../../config';

const loginUserController = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthServices.loginUser(loginData);

  const { refreshToken, ...othersResult } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successfully',
    data: othersResult,
  });
});
const refreshTokenController = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await AuthServices.createRefreshToken(refreshToken);

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'refresh Token  successfully',
      data: result,
    });
  }
);

const changePasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { ...bothPassword } = req.body;

    const result = await AuthServices.changePassword(user, bothPassword);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password change successfully',
      data: result,
    });
  }
);

export const AuthController = {
  loginUserController,
  refreshTokenController,
  changePasswordController,
};
