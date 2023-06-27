import httpStatus from 'http-status';
import APIError from '../../../errors/ApiErrors';
import { User } from '../user/user.model';
import {
  IJwtRefreshTokenResponse,
  ILoginResponse,
  ILoginUser,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { JwtToken } from '../../../helpers/jwtHelpers';
import jwt from 'jsonwebtoken';
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

const createRefreshToken = async (
  token: string
): Promise<IJwtRefreshTokenResponse> => {
  let verifiedToken: JwtPayload | null = null;
  try {
    verifiedToken = jwt.verify(
      token,
      config.jwt.refresh_secret as Secret
    ) as JwtPayload;
  } catch (err) {
    throw new APIError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  const { userId } = verifiedToken;

  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, "User doesn't exist");
  }

  const newAccessToken = JwtToken.createToken(
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

export const AuthServices = {
  loginUser,
  createRefreshToken,
};
