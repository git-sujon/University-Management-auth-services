import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { IAcademicDepartment } from './academicDepartment.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { AcademicDepartmentService } from './academicDepartment.services';
import pick from '../../../shared/pick';
import { academicDepartmentFilterableFiled } from './academicDepartment.constant';
import { paginationFields } from '../../../constants/pagination';
const createDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartment } = req.body;

    const result = await AcademicDepartmentService.createDepartment(
      academicDepartment
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Created Successfully',
      data: result,
    });
  }
);
const getAllDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFiled);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AcademicDepartmentService.getAllDepartment(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicDepartmentService.getSingleDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Retrieved Successfully',
      data: result,
    });
  }
);

const UpdateDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...updatedInfo } = req.body;
    const result = await AcademicDepartmentService.updateDepartment(
      id,
      updatedInfo
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department Update Successfully',
      data: result,
    });
  }
);

const deleteDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AcademicDepartmentService.deleteDepartment(id);

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department delete Successfully',
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createDepartmentController,
  getAllDepartmentController,
  getSingleDepartmentController,
  UpdateDepartmentController,
  deleteDepartmentController,
};
