/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse, ISortCondition } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IAdmin, IAdminFilters } from './admin.interface';

import { Admin } from './admin.model';
import APIError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { adminSearchableFields } from './admin.constant';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const getAllAdmin = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new APIError(
      httpStatus.NOT_FOUND,
      'This Admin is not found in database'
    );
  }

  const { name, ...AdminData } = payload;
  const updatedAdminData: Partial<IAdmin> = { ...AdminData };

  // dynamically handle

  const objectData = { name };
  Object.entries(objectData).forEach(([objectName, objectValue]) => {
    if (objectValue && Object.keys(objectValue).length > 0) {
      Object.entries(objectValue).forEach(([key, value]) => {
        const objectNamesKey = `${objectName}.${key}`;
        (updatedAdminData as any)[objectNamesKey] = value;
      });
    }
  });

  const result = await Admin.findOneAndUpdate({ id }, updatedAdminData, {
    new: true,
  });

  return result;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'Admin Not Found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const student = await Admin.findOneAndDelete({ id }, { session });

    if (!student) {
      throw new APIError(httpStatus.NOT_FOUND, "Admin Can't Delete");
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

export const AdminServices = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
