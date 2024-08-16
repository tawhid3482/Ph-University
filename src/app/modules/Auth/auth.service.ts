import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { userModel } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt'

const loginUserFromClientSite = async (payload: TLoginUser) => {
  // checking if the user is exist
  const isUserExists = await userModel.findOne({ id: payload?.id });
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'this user is not found!');
  }

  // checking if the user is deleted
  const isDeletedUser = await isUserExists?.isDeleted;
  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already deleted!');
  }
  // checking if the user is block

  const isBlockUser = await isUserExists?.status;
  if (isBlockUser === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'this user is already blocked!');
  }

  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(payload?.password, isUserExists?.password)
console.log(isPasswordMatched)

  // access granted;send accessToken, refreshToken

};

export const authServices = {
  loginUserFromClientSite,
};
