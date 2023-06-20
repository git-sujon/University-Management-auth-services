import { Schema, Model } from 'mongoose';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Schema.Types.ObjectId;
};

export type AcademicDepartmentModel = Model<IAcademicDepartment>;

export type IAcademicDepartmentFilterableFields = {
  searchTerm?: string;
};
