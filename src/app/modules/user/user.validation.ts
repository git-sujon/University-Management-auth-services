import { z } from 'zod';
import {
  bloodGroupConstants,
  genderConstants,
} from '../../../interfaces/constants';

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      gender: z.enum([...genderConstants] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNumber: z.string({
        required_error: 'Contact number is required',
      }),
      photoUrl: z.string({
        required_error: 'Photo URL is required',
      }),
      bloodGroup: z.enum([...bloodGroupConstants] as [string, ...string[]], {
        required_error: 'Blood group is required',
      }),
      emergencyContactNumber: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'Father occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father contact number is required',
        }),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        motherOccupation: z.string({
          required_error: 'Mother occupation is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occupation: z.string({
          required_error: 'Local guardian occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact number is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
    }),
  }),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),

    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      gender: z.enum([...genderConstants] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      photoUrl: z.string({
        required_error: 'Photo URL is required',
      }),
      bloodGroup: z.enum([...bloodGroupConstants] as [string, ...string[]], {
        required_error: 'Blood group is required',
      }),
      designation: z.string({
        required_error: 'designation contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
    }),
  }),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string().refine(val => val.trim() !== '', {
          message: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string().refine(val => val.trim() !== '', {
          message: 'Last name is required',
        }),
      }),
      profileImage: z.string().refine(val => val.trim() !== '', {
        message: 'Profile image is required',
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email()
        .refine(val => val.trim() !== '', {
          message: 'Email is required',
        }),
      contactNo: z.string().refine(val => val.trim() !== '', {
        message: 'Contact number is required',
      }),
      emergencyContactNo: z.string().refine(val => val.trim() !== '', {
        message: 'Emergency contact number is required',
      }),
      gender: z
        .enum([...genderConstants] as [string, ...string[]])
        .optional()
        .refine(val => val !== undefined, {
          message: 'Gender is required',
        }),
      permanentAddress: z.string().optional(),
      presentAddress: z.string().optional(),
      bloodGroup: z
        .enum([...bloodGroupConstants] as [string, ...string[]])
        .refine(val => val !== undefined, {
          message: 'Blood group is required',
        }),
      managementDepartment: z.string().refine(val => val.trim() !== '', {
        message: 'Management department is required',
      }),
      designation: z.string().refine(val => val.trim() !== '', {
        message: 'Designation is required',
      }),
    }),
  }),
});

export const userValidation = {
  createStudentValidationSchema,
  createFacultyValidationSchema,
  createAdminValidationSchema,
};
