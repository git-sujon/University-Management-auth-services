import { z } from 'zod';
import {
  bloodGroupConstants,
  genderConstants,
} from '../../../interfaces/constants';

// const createStudentValidation = z.object({
//   name: z.object({
//     firstName: z.string({
//       required_error: 'First name is required',
//     }),
//     middleName: z.string().optional(),
//     lastName: z.string({
//       required_error: 'Last name is required',
//     }),
//   }),
//   gender: z.enum([...genderConstants] as [string, ...string[]], {
//     required_error: 'Gender is required',
//   }),
//   dateOfBirth: z.string({
//     required_error: 'Date of birth is required',
//   }),
//   email: z
//     .string({
//       required_error: 'Email is required',
//     })
//     .email(),
//   contactNumber: z.string({
//     required_error: 'Contact number is required',
//   }),
//   photoUrl: z.string({
//     required_error: 'Photo URL is required',
//   }),
//   bloodGroup: z.enum([...bloodGroupConstants] as [string, ...string[]], {
//     required_error: 'Blood group is required',
//   }),
//   emergencyContactNumber: z.string({
//     required_error: 'Emergency contact number is required',
//   }),
//   presentAddress: z.string({
//     required_error: 'Present address is required',
//   }),
//   permanentAddress: z.string({
//     required_error: 'Permanent address is required',
//   }),
//   guardian: z.object({
//     fatherName: z.string({
//       required_error: 'Father name is required',
//     }),
//     fatherOccupation: z.string({
//       required_error: 'Father occupation is required',
//     }),
//     fatherContactNo: z.string({
//       required_error: 'Father contact number is required',
//     }),
//     motherName: z.string({
//       required_error: 'Mother name is required',
//     }),
//     motherOccupation: z.string({
//       required_error: 'Mother occupation is required',
//     }),
//     address: z.string({
//       required_error: 'Address is required',
//     }),
//   }),
//   localGuardian: z.object({
//     name: z.string({
//       required_error: 'Local guardian name is required',
//     }),
//     occupation: z.string({
//       required_error: 'Local guardian occupation is required',
//     }),
//     contactNo: z.string({
//       required_error: 'Local guardian contact number is required',
//     }),
//     address: z.string({
//       required_error: 'Local guardian address is required',
//     }),
//   }),
//   academicDepartment: z.string({
//     required_error: 'Academic department is required',
//   }),
//   academicFaculty: z.string({
//     required_error: 'Academic faculty is required',
//   }),
//   academicSemester: z.string({
//     required_error: 'Academic semester is required',
//   }),
// });

const updateStudentValidation = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...genderConstants] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    contactNumber: z.string().optional(),
    photoUrl: z.string().optional(),
    bloodGroup: z
      .enum([...bloodGroupConstants] as [string, ...string[]])
      .optional(),
    emergencyContactNumber: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherOccupation: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string().optional(),
        occupation: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    academicSemester: z.string().optional(),
  }),
});

export const studentValidation = {
  // createStudentValidation,
  updateStudentValidation,
};
