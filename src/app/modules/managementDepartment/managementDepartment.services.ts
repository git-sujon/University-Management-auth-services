import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IManagementDepartment,
  IManagementDepartmentFilterableFields,
} from './managementDepartment.interface';

import { IGenericResponse, ISortCondition } from '../../../interfaces/common';
import { ManagementDepartment } from './managementDepartment.model';

const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload);
  return result;
};

const getAllManagementDepartment = async (
  filters: IManagementDepartmentFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: ISortCondition = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whichCondition = [];

  if (searchTerm) {
    whichCondition.push({
      title: {
        $regex: searchTerm,
        $options: 'i',
      },
    });
  }

  if (Object.keys(filtersData).length) {
    whichCondition.push(filtersData);
  }

  const isCondition = whichCondition.length > 0 ? { $and: whichCondition } : {};

  const total = await ManagementDepartment.countDocuments(isCondition);

  const result = await ManagementDepartment.find(isCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleManagementDepartment = async (
  payload: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(payload);
  return result;
};

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteManagementDepartment = async (
  payload: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(payload);
  return result;
};

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
};
