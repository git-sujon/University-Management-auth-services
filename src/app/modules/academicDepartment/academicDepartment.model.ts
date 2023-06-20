import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academicDepartment.interface';
import { Schema, model } from 'mongoose';
const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
