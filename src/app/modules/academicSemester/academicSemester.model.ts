import { Schema, model } from 'mongoose';
import status from 'http-status';
import {
  IAcademicSemester,
  AcademicSemesterModel,
} from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.contant';
import APIError from '../../../errors/ApiErrors';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: academicSemesterTitles },

    year: { type: String, required: true },
    code: { type: String, required: true, enum: academicSemesterCodes },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });

  if (isExist) {
    throw new APIError(status.CONFLICT, 'Academic Semester is already exist!!');
  }

  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
