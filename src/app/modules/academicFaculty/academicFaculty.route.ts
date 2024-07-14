import express from 'express'
import validationRequest from '../../middleware/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { AcademicSemesterControllers } from '../academicSemester/academicSemester.controller'

const router = express.Router()

router.post('/create-faculty',validationRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), AcademicSemesterControllers.createAcademicSemester)