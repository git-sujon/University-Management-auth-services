import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse, ISortCondition } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IStudent, IStudentFilter } from './student.interface';

import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';
import APIError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
const getAllStudent = async (
  filters: IStudentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: ISortCondition = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester');

  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'Student not found in database');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  // dynamically handle

  const objectData = { name, guardian, localGuardian };
  Object.entries(objectData).forEach(([objectName, objectValue]) => {
    if (objectValue && Object.keys(objectValue).length > 0) {
      Object.entries(objectValue).forEach(([key, value]) => {
        const objectNamesKey = `${objectName}.${key}`;
        (updatedStudentData as any)[objectNamesKey] = value;
      });
    }
  });

  // if (name && Object.keys(name).length > 0) {
  //   Object.keys(name).forEach((key) => {
  //     const nameKey = `name.${key}`;
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (updatedStudentData as any) [nameKey] = name[key as keyof typeof name];
  //   });
  // }

  // if (guardian && Object.keys(guardian).length > 0) {
  //   Object.keys(guardian).forEach((key) => {
  //     const guardianKey = `guardian.${key}`;
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (updatedStudentData as any) [guardianKey] = guardian[key as keyof typeof guardian];
  //   });
  // }

  // if (localGuardian && Object.keys(localGuardian).length > 0) {
  //   Object.keys(localGuardian).forEach((key) => {
  //     const localGuardianKey = `localGuardian.${key}`;
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (updatedStudentData as any) [localGuardianKey] = localGuardian[key as keyof typeof localGuardian];
  //   });
  // }

  const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
    new: true,
  });

  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .populate('academicSemester');
  return result;
};

export const studentServices = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};