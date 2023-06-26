import { z } from 'zod';

const createManagementDepartmentSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});
const updateManagementDepartmentSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is Required',
      })
      .optional(),
  }),
});

export const ManagementDepartmentValidation = {
  createManagementDepartmentSchema,
  updateManagementDepartmentSchema,
};
