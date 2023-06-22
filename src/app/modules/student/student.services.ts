import APIError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';



import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse, ISortCondition } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IStudent } from './student.interface';


const getAllStudent = async (
  filters: IStudentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  console.log(filtersData);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: StudentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  const sortCondition: ISortCondition = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Student.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Student.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IStudent | null> => {
  const result = await Student.findById(id);

  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  if (
    payload.title &&
    payload.code &&
    StudentTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new APIError(httpStatus.BAD_REQUEST, 'Invalid Semester code');
  }

  const result = await Student.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );

  return result;
};

const deleteSemester = async (
  id: string
): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const studentServices = {

  getAllStudent,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
