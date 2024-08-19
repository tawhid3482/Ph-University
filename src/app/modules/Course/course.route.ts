import express from 'express';
import validationRequest from '../../middleware/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';
import auth from '../../middleware/auth';

const route = express.Router();

route.post(
  '/create-course',
  auth('admin'),
  validationRequest(CourseValidation.courseValidationSchema),
  CourseController.createCourse
);
route.get('/', CourseController.getAllCourse);
route.get(
  '/:id',
  auth('student', 'faculty', 'admin'),
  CourseController.getSingleCourse
);
route.delete('/:id', auth('admin'), CourseController.deleteCourse);
route.patch(
  '/:id',
  auth('admin'),
  validationRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse
);

route.put(
  '/:courseId/assign-faculties',
  validationRequest(CourseValidation.assignFacultiesValidationSchema),
  CourseController.assignFaculties
);
route.delete(
  '/:courseId/remove-faculties',
  validationRequest(CourseValidation.assignFacultiesValidationSchema),
  CourseController.removeFaculties
);

export const CourseRoutes = route;
