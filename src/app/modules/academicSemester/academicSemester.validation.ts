import { string, z } from 'zod';
import { MonthSchema, semesterCodeSchema, semesterNameSchema } from './academicSemester.constant';

export const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterNameSchema] as [string, ...string[]]),
    code: z.enum([...semesterCodeSchema] as [string, ...string[]]),
    year: z.date(),
    startMonth: z.enum([...MonthSchema] as [string, ...string[]]),
    endMonth: z.enum([...MonthSchema] as [string, ...string[]]),
  }),
});

export const academicSemesterValidation = {
  academicSemesterValidationSchema,
};
