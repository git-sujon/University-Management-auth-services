import { NextFunction, Request, Response } from 'express';
import { academicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.contant';
const createAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemester } = req.body;

    const result = await academicSemesterServices.createAcademicSemester(
      academicSemester
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Created Successfully',
      data: result,
    });
    next();
  }
);

const getAllAcademicSemesterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await academicSemesterServices.getAllAcademicSemester(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

// const getSingleSemesterController =() => {

// }

export const academicSemesterController = {
  createAcademicSemesterController,
  getAllAcademicSemesterController,
  // getSingleSemesterController
};
