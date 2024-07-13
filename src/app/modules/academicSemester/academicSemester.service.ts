import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const result = await academicSemesterModel.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await academicSemesterModel.find();
  return result;
};
const getSingleAcademicSemesterFromDB = async (_id: string) => {
  const result = await academicSemesterModel.findOne({ _id });
  return result;
};
const updateAcademicSemesterFromDB = async (_id: string) => {
  const result = await academicSemesterModel.updateOne({ _id });
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB
};
