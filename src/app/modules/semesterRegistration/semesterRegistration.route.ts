import express from 'express';
import validationRequest from '../../middleware/validateRequest';

const route = express.Router()

route.post('/create-semesterRegistration', validationRequest(), semesterRegistrationControllers.createSemesterRegistration)
route.get('/', validationRequest(), semesterRegistrationControllers.getAllSemesterRegistration)


export const semesterRegistrationRoutes = route