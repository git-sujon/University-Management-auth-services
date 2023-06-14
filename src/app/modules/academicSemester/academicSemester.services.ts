import APIError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { academicSemesterTitleCodeMapper } from './academicSemester.contant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new APIError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllAcademicSemester = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academicSemesterServices = {
  createAcademicSemester,
  getAllAcademicSemester,
};
