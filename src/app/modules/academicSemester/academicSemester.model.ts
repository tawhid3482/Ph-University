import { model, Schema } from 'mongoose';
import { TAcademicSemester, TMonth } from './academicSemester.interface';

const MonthSchema: TMonth[] = [
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
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: {
        values: ['Autumn', 'Summar', 'Fall'],
        message: 'Name is required',
      },
      required: true,
    },
    code: {
      type: String,
      enum: {
        values: ['01', '02', '03'],
        message: 'Code is required',
      },
      required: true,
    },
    year: { type: Date, required: true },
    startMonth: { type: String, enum: MonthSchema, required: true },
    endMonth: { type: String, enum: MonthSchema, required: true },
  },
  {
    timestamps: true,
  }
);

export const academicSemesterModel = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema
);
