import express from 'express'
import validationRequest from '../../middleware/validateRequest'
import { CourseValidation } from './course.validation'
import { CourseController } from './course.controller'



const route = express.Router()


route.post('create-course', validationRequest(CourseValidation.courseValidationSchema), CourseController.createCourse)
route.get('/',CourseController.getAllCourse)
route.get('/:id',CourseController.getSingleCourse)
route.delete('/:id',CourseController.deleteCourse)
route.patch('/:id',CourseController.updateCourse)

export const CourseRoutes = route
