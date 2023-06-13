import { NextFunction, Request, Response } from 'express';
import { academicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemester } = req.body;

    const result = await academicSemesterServices.createAcademicSemester(
      academicSemester
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
    next();
  }
);

export const academicSemesterController = {
  createAcademicSemesterController,
};
