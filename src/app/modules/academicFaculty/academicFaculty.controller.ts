import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { IAcademicFaculty } from './academicFaculty.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { AcademicFacultyService } from './academicFaculty.services';
const createFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicFaculty } = req.body;

    const result = await AcademicFacultyService.createFaculty(academicFaculty);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Created Successfully',
      data: result,
    });
  }
);
const getAllFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.getAllFaculty();

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Facultys Retrieved Successfully',
      data: result,
    });
  }
);
const getSingleFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.getSingleFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Retrieved Successfully',
      data: result,
    });
  }
);

const UpdateFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...updatedInfo } = req.body;
    const result = await AcademicFacultyService.updateFaculty(id, updatedInfo);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty Update Successfully',
      data: result,
    });
  }
);

const deleteFacultyController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicFacultyService.deleteFaculty(id);

    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty delete Successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createFacultyController,
  getAllFacultyController,
  getSingleFacultyController,
  UpdateFacultyController,
  deleteFacultyController,
};
