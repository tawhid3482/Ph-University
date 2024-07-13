import express, { Router } from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validationRequest from '../../middleware/validateRequest'
import { academicSemesterValidation } from './academicSemester.validation'

const router = express.Router()

router.post('/create-academic-semester', validationRequest(academicSemesterValidation.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/', AcademicSemesterControllers.getAllAcademicSemester)
router.get('/:_id', AcademicSemesterControllers.getSingleAcademicSemester)
router.patch('/:_id',validationRequest(academicSemesterValidation.updateAcademicSemesterValidationSchema), AcademicSemesterControllers.updateAcademicSemester)

export const AcademicSemesterRoutes = router