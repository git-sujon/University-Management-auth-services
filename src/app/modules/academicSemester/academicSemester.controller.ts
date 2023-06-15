import { Request, Response } from 'express';
import { academicSemesterServices } from './academicSemester.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicSemester } from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';
const createSemesterController = catchAsync(
  async (req: Request, res: Response) => {
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
  }
);

const getAllSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await academicSemesterServices.getAllAcademicSemester(
      filters,
      paginationOptions
    );
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semesters retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await academicSemesterServices.getSingleSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester retrieved Successfully',
      data: result,
    });
  }
);

const updateSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result = await academicSemesterServices.updateSemester(
      id,
      updatedData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Updated Successfully',
      data: result,
    });
  }
);

const deleteSemesterController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await academicSemesterServices.deleteSemester(id);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Deleted Successfully',
      data: result,
    });
  }
);

export const academicSemesterController = {
  createSemesterController,
  getAllSemesterController,
  getSingleSemesterController,
  updateSemesterController,
  deleteSemesterController,
};
