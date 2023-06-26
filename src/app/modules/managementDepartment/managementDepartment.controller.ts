import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { IManagementDepartment } from './managementDepartment.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ManagementDepartmentService } from './managementDepartment.services';
import pick from '../../../shared/pick';
import { managementDepartmentFilterableFiled } from './managementDepartment.constant';
import { paginationFields } from '../../../constants/pagination';
const createManagementDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartment } = req.body;

    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartment
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Created Successfully',
      data: result,
    });
  }
);
const getAllManagementDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFiled);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions
    );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleManagementDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Retrieved Successfully',
      data: result,
    });
  }
);

const UpdateManagementDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...updatedInfo } = req.body;
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedInfo
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Update Successfully',
      data: result,
    });
  }
);

const deleteManagementDepartmentController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department delete Successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartmentController,
  getAllManagementDepartmentController,
  getSingleManagementDepartmentController,
  UpdateManagementDepartmentController,
  deleteManagementDepartmentController,
};
