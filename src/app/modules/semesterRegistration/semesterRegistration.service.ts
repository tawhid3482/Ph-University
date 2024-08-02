import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { semesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is already "upcoming"| 'ongoing

  const isThereAnyUpcomingOrOngoingSemester =
    await semesterRegistrationModel.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an  ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`
    );
  }

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

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    semesterRegistrationModel.find(),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await semesterRegistrationModel.findById(id);
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {

  // check if the requested register semester is exists // mane id ase kina 
   

  const isSemesterRegistrationExists = await semesterRegistrationModel.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'this  Semester is not found'
    );
  }


  // if the requested semester registration is ended, we will not update anything
  const requestedSemesterStatus = isSemesterRegistrationExists?.status
  if (requestedSemesterStatus === 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${requestedSemesterStatus?.status}`
    );
  }
  const result = await semesterRegistrationModel.findByIdAndUpdate(id, {});
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
