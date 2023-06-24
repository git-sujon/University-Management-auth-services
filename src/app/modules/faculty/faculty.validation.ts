import { z } from 'zod';
import {
  bloodGroupConstants,
  genderConstants,
} from '../../../interfaces/constants';

const updateFacultyValidation = z.object({
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
    contactNo: z.string().optional(),
    photoUrl: z.string().optional(),
    bloodGroup: z
      .enum([...bloodGroupConstants] as [string, ...string[]])
      .optional(),
    designation: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const facultyValidation = {
  updateFacultyValidation,
};
