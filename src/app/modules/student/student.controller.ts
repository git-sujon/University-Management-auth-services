import { Request, Response } from 'express';

import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { semesterSearchableFields } from './student.constant';
import { IStudent } from './student.interface';
import { studentServices } from './student.services';



const getAllStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, semesterSearchableFields);
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
    const result = await StudentServices.getSingleStudent(id);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Student retrieved Successfully',
      data: result,
    });
  }
);



const deleteStudentController = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await StudentServices.deleteStudent(id);

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Student Deleted Successfully',
      data: result,
    });
  }
);



export const StudentController ={
    getAllStudentController,
    getSingleStudentController,
    deleteStudentController,
}