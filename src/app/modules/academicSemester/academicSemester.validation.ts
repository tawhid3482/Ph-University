import { string, z } from 'zod';
import { MonthSchema, semesterCodeSchema, semesterNameSchema } from './academicSemester.constant';

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterNameSchema] as [string, ...string[]]),
    code: z.enum([...semesterCodeSchema] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...MonthSchema] as [string, ...string[]]),
    endMonth: z.enum([...MonthSchema] as [string, ...string[]]),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
