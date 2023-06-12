import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.contant';

const academicSemesterSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'tile is Required',
    }),
    year: z.number({
      required_error: 'year is Required',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'code is Required',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'endMonth is Required',
    }),
  }),
});

export const academicSemesterValidation = {
  academicSemesterSchema,
};
