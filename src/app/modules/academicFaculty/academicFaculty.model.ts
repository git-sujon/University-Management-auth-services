import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academicFaculty.interface';
import { Schema, model } from 'mongoose';
const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
