import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUserFromClientSite = async (payload: TLoginUser) => {
  // checking if the user is exist
  const userData = await userModel.isUserExistsByCustomId(payload.id);
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

  // checking if the password is correct
  if (
    !(await userModel.isPasswordMatched(payload?.password, userData?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  // access granted;send accessToken, refreshToken
  // create token and sent to the client
  const jwtPayload = {
    userId: userData,
    role: userData.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: 60 * 60,
  });

  return {
    accessToken,
    needsPasswordChange: userData?.needsPasswordChange,
  };
};

export const authServices = {
  loginUserFromClientSite,
};
