import { z } from 'zod';

export const academicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    code: z.string(),
    year: z.string(),
    startMonth: z.string(),
    endMonth: z.string(),
  }),
});

export const academicSemesterValidation = {
  academicSemesterValidationSchema,
};
