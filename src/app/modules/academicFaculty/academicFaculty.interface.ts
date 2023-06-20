import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};

export type AcademicFacultyModel = Model<IAcademicFaculty>;

export type IAcademicFacultyFilterableFields = {
  searchTerm?: string;
};
