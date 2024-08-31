import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from './auth.utils';

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
    userId: userData?.id,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: userData?.needsPasswordChange,
  };
};

const changePasswordIntoDb = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userData = await userModel.isUserExistsByCustomId(user.userId);
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
    !(await userModel.isPasswordMatched(
      payload?.oldPassword,
      userData?.password
    ))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  // hash the new password
  const newHashPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await userModel.findOneAndUpdate(
    {
      id: user?.userId,
      role: user?.role,
    },
    {
      password: newHashPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );
  return null;
};

const refreshTokenFrom = async (token: string) => {
  // // check if the token is sent from the client
  // if (!token) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  // }

  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
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

  // access granted;send accessToken, refreshToken
  // create token and sent to the client
  const jwtPayload = {
    userId: userData?.id,
    role: userData.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return { accessToken };
};

const forgetPasswordIntoDB = async (userId: string) => {
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

  // create token and sent to the client
  const jwtPayload = {
    userId: userData?.id,
    role: userData.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m'
  );

  const resetUILInk = `http://localhost:3000?id=${userData?.id}&token=${resetToken}`;
  console.log(resetUILInk);
  
};

export const authServices = {
  loginUserFromClientSite,
  changePasswordIntoDb,
  refreshTokenFrom,
  forgetPasswordIntoDB,
};
