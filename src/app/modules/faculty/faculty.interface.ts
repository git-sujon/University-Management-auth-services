import { Model, Schema } from 'mongoose';

type GenderEnum = 'male' | 'female';
type BloodGroupEnum = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
type IName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IFaculty = {
  id: string;
  name: IName;
  gender: GenderEnum;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: BloodGroupEnum;
  designation: string;
  academicDepartment: Schema.Types.ObjectId;
  academicFaculty: Schema.Types.ObjectId;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
export type IFacultyFilter = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  bloodGroup?: BloodGroupEnum;
  designation?: string;
};
