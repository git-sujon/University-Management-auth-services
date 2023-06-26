import { Model, Types } from 'mongoose';

type GenderEnum = 'male' | 'female';
type BloodGroupEnum = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IAdmin = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: GenderEnum;
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: BloodGroupEnum;

  managementDepartment: Types.ObjectId;

  designation: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  bloodGroup?: BloodGroupEnum;
  designation?: string;
};
