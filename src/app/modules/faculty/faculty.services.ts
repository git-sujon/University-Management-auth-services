import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse, ISortCondition } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IFaculty, IFacultyFilter } from './faculty.interface';

import { Faculty } from './faculty.model';
import APIError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { facultySearchableFields } from './faculty.constant';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const getAllFaculty = async (
  filters: IFacultyFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new APIError(
      httpStatus.NOT_FOUND,
      'This Faculty is not found in database'
    );
  }

  const { name, ...FacultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...FacultyData };

  // dynamically handle

  const objectData = { name };
  Object.entries(objectData).forEach(([objectName, objectValue]) => {
    if (objectValue && Object.keys(objectValue).length > 0) {
      Object.entries(objectValue).forEach(([key, value]) => {
        const objectNamesKey = `${objectName}.${key}`;
        (updatedFacultyData as any)[objectNamesKey] = value;
      });
    }
  });

  const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
    new: true,
  });

  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'Faculty Not Found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const student = await Faculty.findOneAndDelete({ id }, { session });

    if (!student) {
      throw new APIError(httpStatus.NOT_FOUND, "Faculty Can't Delete");
    }

    // delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return student;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const FacultyServices = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
