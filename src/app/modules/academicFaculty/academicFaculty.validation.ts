import { z } from 'zod';

const createAcademicFaculty = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});
const updateAcademicFaculty = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFaculty,
  updateAcademicFaculty,
};
