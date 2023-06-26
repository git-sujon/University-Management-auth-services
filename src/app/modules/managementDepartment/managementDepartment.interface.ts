import { Model } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};

export type ManagementDepartmentModel = Model<IManagementDepartment>;

export type IManagementDepartmentFilterableFields = {
  searchTerm?: string;
};
