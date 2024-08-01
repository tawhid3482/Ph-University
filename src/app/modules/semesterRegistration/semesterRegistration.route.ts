import express from 'express';
import validationRequest from '../../middleware/validateRequest';
import { semesterRegistrationValidation } from './semesterRegistration.validation';

const route = express.Router()

route.post('/create-semesterRegistration', validationRequest(semesterRegistrationValidation.semesterRegistrationValidationSchema), semesterRegistrationControllers.createSemesterRegistration)

route.get('/', semesterRegistrationControllers.getAllSemesterRegistration)


export const semesterRegistrationRoutes = route