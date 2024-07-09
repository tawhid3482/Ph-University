import { Schema } from 'mongoose';
import { TAcademicSemester, TMonth } from './academicSemester.interface';



const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: {
      values: ['Autumn', 'Summar', 'Fall'],
      message: 'Name is required',
    },
  },
  code: {
    type: String,
    enum: {
      values: ['01', '02', '03'],
      message: 'Code is required',
    },
  },
  year: { type: Date },
  startMonth:
});
