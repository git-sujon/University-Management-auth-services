import APIError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { academicSemesterTitleCodeMapper } from './academicSemester.contant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new APIError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

export const academicSemesterServices = {
  createAcademicSemester,
};

//test
