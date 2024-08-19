import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/users/user.interface';
import { userModel } from '../modules/users/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // auth token validation check
    const token = req.headers.authorization;
    // check if the token is sent from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { userId, role, iat } = decoded;

    // check the user is exist
    const userData = await userModel.isUserExistsByCustomId(userId);
    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!');
    }

    // checking if the user is deleted
    if (userData?.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted!');
    }

    //   // checking if the user is block
    if (userData.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked!');
    }
    if (
      userData.passwordChangeAt &&
      userModel.isJWTIssuedBeforePasswordChanged(
        userData.passwordChangeAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
