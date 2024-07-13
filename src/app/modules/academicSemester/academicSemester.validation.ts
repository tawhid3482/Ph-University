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

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...semesterNameSchema] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...semesterCodeSchema] as [string, ...string[]]).optional(),
    startMonth: z.enum([...MonthSchema] as [string, ...string[]]).optional(),
    endMonth: z.enum([...MonthSchema] as [string, ...string[]]).optional(),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema
};
