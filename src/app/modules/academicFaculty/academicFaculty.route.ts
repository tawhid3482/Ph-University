import express from 'express'
import validationRequest from '../../middleware/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyControllers } from './academicFaculty.controller'

const router = express.Router()

router.post('/create-academic-faculty',validationRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyControllers.createAcademicFaculty)

router.get('/',AcademicFacultyControllers.getAllAcademicFaculty)

router.get('/:id',AcademicFacultyControllers.getSingleAcademicFaculty)

router.patch('/:id',validationRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyControllers.updateAcademicFaculty)

export const AcademicFacultyRoutes = router
