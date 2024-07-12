import express, { Router } from 'express'

const router = express.Router()

router.post('/create-academic-semester', academicSemesterControllers.createAcademicSemester)

export const AcademicSemesterRoutes = router