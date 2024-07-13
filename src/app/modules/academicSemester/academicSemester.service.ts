import { TAcademicSemester } from './academicSemester.interface';
import { academicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  type TAcademicSemesterNameCodeMapper = {
    [key: string]: string;
  };

  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: '01',
    Summar: '02',
    Fall: '03',
  };

  if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new Error('Invalid Semester Code')
  }

  const result = await academicSemesterModel.create(payload);
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
