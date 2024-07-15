import express from 'express'
import validationRequest from '../../middleware/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentControllers } from './academicDepartment.controller'


const router = express.Router()

router.post('/create-academic-department', validationRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentControllers.createAcademicDepartment)
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment)
router.get('/:id', AcademicDepartmentControllers.getSingleAcademicDepartment)
router.patch('/:id',validationRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment)


export const AcademicDepartmentRoutes = router