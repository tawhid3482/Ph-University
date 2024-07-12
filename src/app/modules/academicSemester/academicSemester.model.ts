import { model, Schema } from 'mongoose';
import { TAcademicSemester,  } from './academicSemester.interface';
import { MonthSchema, semesterCodeSchema, semesterNameSchema } from './academicSemester.constant';


const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: semesterNameSchema,
      required: true,
    },
    code: {
      type: String,
      enum: semesterCodeSchema,
      required: true,
    },
    year: { type: String, required: true },
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
