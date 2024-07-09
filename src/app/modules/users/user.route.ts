import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
  Router,
} from 'express';
import { UserControllers } from './user.controller';
import { AnyZodObject } from 'zod';
import { validationSchema } from '../students/student.validation';
const router = express.Router();

const validationRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validation check
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.post(
  '/create-student',
  validationRequest(validationSchema.studentValidationSchema),
  UserControllers.createStudent
);
router.post('/create-faculty');
router.post('/create-admin');

export const UserRoutes = router;
