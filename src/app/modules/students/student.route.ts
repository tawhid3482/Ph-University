import express from 'express';
import { studentControllers } from './student.controller';
import validationRequest from '../../middleware/validateRequest';
import studentValidationSchema from './student.validation-joi';
import { StudentValidationSchema } from './student.validation';

const router = express.Router();

router.get('/', studentControllers.getAllStudent);
router.get('/:id', studentControllers.getSingleStudent);
router.delete('/:id', studentControllers.deleteStudent);
router.patch(
  '/:id',
  validationRequest(StudentValidationSchema.updateStudentValidationSchema),
  studentControllers.updateStudent
);

export const StudentRoutes = router;
