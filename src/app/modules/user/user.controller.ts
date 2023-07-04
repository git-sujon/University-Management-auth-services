import { Request, Response } from 'express';
import { UserServices } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;

    const result = await UserServices.createStudent(student, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  }
);

const createFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;

    const result = await UserServices.createFaculty(faculty, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty Created successfully',
      data: result,
    });
  }
);
const createAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;

    const result = await UserServices.createAdmin(admin, userData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin Created successfully',
      data: result,
    });
  }
);

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
  createStudentController,
  getAllUserController,
  createFacultyController,
  createAdminController,
};
