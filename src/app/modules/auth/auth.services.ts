import httpStatus from 'http-status';
import APIError from '../../../errors/ApiErrors';
import { User } from '../user/user.model';
import {
  IChangePassword,
  IJwtRefreshTokenResponse,
  ILoginResponse,
  ILoginUser,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import bcrypt from 'bcrypt';
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

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  const refreshToken = jwtHelpers.createToken(
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

const createRefreshToken = async (
  token: string
): Promise<IJwtRefreshTokenResponse> => {
  let verifiedToken: JwtPayload | null = null;
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new APIError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload,
  bothPassword: IChangePassword
): Promise<void> => {
  const { userId } = user;
  const { oldPassword, newPassword } = bothPassword;
  const userData = await User.isUserExist(userId);
  if (!userData) {
    throw new APIError(httpStatus.UNAUTHORIZED, "User doesn't exist");
  }

  if (
    userData.password &&
    !(await User.isMatchPassword(oldPassword, userData.password))
  ) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Old password Incorrect');
  }

  const updatedPassword = (userData.password = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  ));

  await User.updateOne(
    { id: userId },
    { password: updatedPassword, needPasswordChange: false },
    { passwordChangeAt: new Date() }
  );
  // userData.password= newPassword
  // userData.needPasswordChange=false
  // userData.save()
};

export const AuthServices = {
  loginUser,
  createRefreshToken,
  changePassword,
};
