import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from '../admin/admin.interface';
import {
  bloodGroupConstants,
  genderConstants,
} from '../../../interfaces/constants';

const adminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: String,
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: genderConstants,
    },
    permanentAddress: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroupConstants,
    },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
