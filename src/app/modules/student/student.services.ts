import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse, ISortCondition } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IStudent, IStudentFilter } from './student.interface';

import { Student } from './student.model';
import { studentSearchableFields } from './student.constant';
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
  const result = await Student.findByIdAndUpdate({ _id: id }, payload, {
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
