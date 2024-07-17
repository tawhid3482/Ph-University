import express from 'express';
import { studentControllers } from './student.controller';
import validationRequest from '../../middleware/validateRequest';
import studentValidationSchema from './student.validation-joi';
import { StudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', studentControllers.getAllStudent);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deleteStudent);
router.patch(
  '/:studentId',
  validationRequest(StudentValidationSchema.updateStudentValidationSchema),
  studentControllers.updateStudent
);

export const StudentRoutes = router;
