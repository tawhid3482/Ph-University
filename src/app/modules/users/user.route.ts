import express from 'express';
import { UserControllers } from './user.controller';
import { validationSchema } from '../students/student.validation';
import validationRequest from '../../middleware/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validationRequest(validationSchema.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post('/create-faculty');
router.post('/create-admin');

export const UserRoutes = router;
