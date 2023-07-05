import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    needPasswordChange: { type: Boolean, default: true },
    passwordChangeAt: { type: Date },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    admin: { type: Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// statics methods

userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'role' | 'needPasswordChange'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needPasswordChange: 1 }
  );
};

userSchema.statics.isMatchPassword = async function (
  givenPassword: string,
  savedPassword
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// hashing password
// User.save() or user.create()
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  // if (!this.needPasswordChange) {
  //   this.passwordChangeAt = new Date();
  // }
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
