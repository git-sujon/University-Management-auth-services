import { NextFunction, Request, Response } from 'express';
import APIError from '../../errors/ApiErrors';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorize token
      const token = req.headers.authorization;

      if (!token) {
        throw new APIError(httpStatus.UNAUTHORIZED, 'you are not Authorized');
      }

      //   verify token

      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifiedToken(
        token,
        config.jwt.secret as Secret
      );

      req.user = verifiedUser;

      //   guard

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new APIError(httpStatus.FORBIDDEN, 'Forbidden Access');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
