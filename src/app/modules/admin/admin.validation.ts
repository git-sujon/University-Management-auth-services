import { z } from 'zod';
import {
  bloodGroupConstants,
  genderConstants,
} from '../../../interfaces/constants';

const updateAdminValidation = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    profileImage: z.string().url().optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    gender: z.enum([...genderConstants] as [string, ...string[]]).optional(),
    permanentAddress: z.string().optional(),
    presentAddress: z.string().optional(),
    bloodGroup: z
      .enum([...bloodGroupConstants] as [string, ...string[]])
      .optional(),
    managementDepartment: z.string().optional(),
    designation: z.string().optional(),
  }),
});

export const adminValidation = {
  updateAdminValidation,
};
