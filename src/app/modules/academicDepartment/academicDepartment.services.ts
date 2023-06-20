import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilterableFields,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import { IGenericResponse, ISortCondition } from '../../../interfaces/common';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllDepartment = async (
  filters: IAcademicDepartmentFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
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

  const total = await AcademicDepartment.countDocuments();

  const result = await AcademicDepartment.find(isCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty');

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  payload: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(payload).populate(
    'academicFaculty'
  );
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteDepartment = async (
  payload: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(payload);
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
