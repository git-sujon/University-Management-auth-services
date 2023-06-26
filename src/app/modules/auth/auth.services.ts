import httpStatus from 'http-status';
import APIError from '../../../errors/ApiErrors';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new APIError(httpStatus.UNAUTHORIZED, "User doesn't exist");
  }

  // Math password

  if (
    isUserExist.password &&
    !(await User.isMatchPassword(password, isUserExist.password))
  ) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  return {
    isUserExist,
  };
};

export const AuthServices = {
  loginUser,
};
