/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needPasswordChange: boolean;
  student?: Types.ObjectId;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

// userModel with statics methods

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needPasswordChange'>>;
  isMatchPassword(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
