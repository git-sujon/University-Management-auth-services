import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

import { IStudent } from './student.interface';
import { studentServices } from './student.services';
import { studentSearchableFields } from './student.constant';

const getAllStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, studentSearchableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await studentServices.getAllStudent(
      filters,
      paginationOptions
    );
    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Students retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await studentServices.getSingleStudent(id);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Student retrieved Successfully',
      data: result,
    });
  }
);
const updateStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const updatedData = req.body;

    const result = await studentServices.updateStudent(id, updatedData);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Updated Successfully',
      data: result,
    });
  }
);

const deleteStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await studentServices.deleteStudent(id);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Student Deleted Successfully',
      data: result,
    });
  }
);

export const StudentController = {
  getAllStudentController,
  getSingleStudentController,
  updateStudentController,
  deleteStudentController,
};
