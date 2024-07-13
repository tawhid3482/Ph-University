import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
  TMonth,
} from './academicSemester.interface';

export const MonthSchema: TMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const semesterNameSchema: TAcademicSemesterName[] = [
  'Autumn',
  'Summar',
  'Fall',
];
export const semesterCodeSchema: TAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summar: '02',
  Fall: '03',
};
