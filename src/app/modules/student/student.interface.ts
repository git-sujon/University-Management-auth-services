import { Model, Schema } from 'mongoose';

type GenderEnum = 'male' | 'female';
type BloodGroupEnum = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
type IName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
type IGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  address: string;
};
type ILocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type IStudent = {
  id: string;
  name: IName;
  gender: GenderEnum;
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  photoUrl: string;
  bloodGroup: BloodGroupEnum;
  emergencyContactNumber: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  academicDepartment: Schema.Types.ObjectId;
  academicFaculty: Schema.Types.ObjectId;
  academicSemester: Schema.Types.ObjectId;
};

export type StudentModel = Model<IStudent, Record<string, unknown>>;
