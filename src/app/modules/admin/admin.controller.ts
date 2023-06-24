import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

import { IAdmin } from './admin.interface';
import { AdminServices } from './admin.services';
import { adminSearchableFields } from './admin.constant';

const getAllAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, adminSearchableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await AdminServices.getAllAdmin(filters, paginationOptions);

    sendResponse<IAdmin[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admins retrieved successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AdminServices.getSingleAdmin(id);

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin retrieved successfully',
      data: result,
    });
  }
);

const updateAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AdminServices.updateAdmin(id, updatedData);

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated successfully',
      data: result,
    });
  }
);

const deleteAdminController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AdminServices.deleteAdmin(id);

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin deleted successfully',
      data: result,
    });
  }
);

export const AdminController = {
  getAllAdminController,
  getSingleAdminController,
  updateAdminController,
  deleteAdminController,
};
