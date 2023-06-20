import { z } from 'zod';

const createAcademicDepartment = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    academicFaculty: z.string({
      required_error: 'AcademicFaculty Id is Required',
    }),
  }),
});
const updateAcademicDepartment = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is Required',
      })
      .optional(),

    academicFaculty: z
      .string({
        required_error: 'AcademicFaculty Id is Required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartment,
  updateAcademicDepartment,
};
