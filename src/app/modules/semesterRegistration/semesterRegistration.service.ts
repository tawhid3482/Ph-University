import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { semesterRegistrationModel } from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  // check if the semester is exists
  const isAcademicSemesterExists = await academicSemesterModel.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'this academic Semester not found'
    );
  }

  // if Semester is already registered

  const isSemesterRegistrationExists = await semesterRegistrationModel.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'this  Semester is already registered'
    );
  }

  const result = await semesterRegistrationModel.create(payload);
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
};
