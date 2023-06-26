import httpStatus from 'http-status';
import APIError from '../../../errors/ApiErrors';
import { User } from '../user/user.model';
import { ILoginResponse, ILoginUser } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JwtToken } from '../../../helpers/jwtHelpers';
const loginUser = async (payload: ILoginUser): Promise<ILoginResponse> => {
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

  //   create access token and refresh token
  const { id: userId, role, needPasswordChange } = isUserExist;

  const accessToken = JwtToken.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  const refreshToken = JwtToken.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
