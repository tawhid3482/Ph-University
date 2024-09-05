import express from 'express';
import { UserControllers } from './user.controller';
import { StudentValidationSchema } from '../students/student.validation';
import validationRequest from '../../middleware/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
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
  // auth(USER_ROLE.admin),
  validationRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  validationRequest(userValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.get(
  '/me',
  auth('admin','faculty','student'),
  UserControllers.getMe,
);

export const UserRoutes = router;
