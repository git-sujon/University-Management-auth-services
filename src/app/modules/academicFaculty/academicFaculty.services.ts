import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicFaculty,
  IAcademicFacultyFilterableFields,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import { IGenericResponse, ISortCondition } from '../../../interfaces/common';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculty = async (
  filters: IAcademicFacultyFilterableFields,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
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

  const total = await AcademicFaculty.countDocuments();

  const result = await AcademicFaculty.find(isCondition)
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

const getSingleFaculty = async (
  payload: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(payload);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (
  payload: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(payload);
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
