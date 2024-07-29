import express from 'express';
import { UserControllers } from './user.controller';
import { StudentValidationSchema } from '../students/student.validation';
import validationRequest from '../../middleware/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validationRequest(StudentValidationSchema.createStudentValidationSchema),
  UserControllers.createStudent
);
router.post(
  '/create-faculty',
  validationRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validationRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
