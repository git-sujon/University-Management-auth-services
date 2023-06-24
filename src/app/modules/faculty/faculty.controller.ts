import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

import { IFaculty } from './faculty.interface';
import { FacultyServices } from './faculty.services';
import { facultySearchableFields } from './faculty.constant';

const getAllFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, facultySearchableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await FacultyServices.getAllFaculty(
      filters,
      paginationOptions
    );

    sendResponse<IFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await FacultyServices.getSingleFaculty(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty retrieved successfully',
      data: result,
    });
  }
);

const updateFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await FacultyServices.updateFaculty(id, updatedData);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty updated successfully',
      data: result,
    });
  }
);

const deleteFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await FacultyServices.deleteFaculty(id);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty deleted successfully',
      data: result,
    });
  }
);

export const FacultyController = {
  getAllFacultyController,
  getSingleFacultyController,
  updateFacultyController,
  deleteFacultyController,
};
