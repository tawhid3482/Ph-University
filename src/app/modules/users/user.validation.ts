import { z } from 'zod';
import { userStatus } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be string' })
    .max(20, { message: 'Password cannot be more than 20 characters' })
    .optional(),
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status:z.enum([...userStatus] as [string, ...string[]])
  })
})


export const userValidation = { userValidationSchema, changeStatusValidationSchema};
