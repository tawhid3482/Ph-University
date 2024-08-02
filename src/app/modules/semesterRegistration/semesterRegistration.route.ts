import express from 'express';
import validationRequest from '../../middleware/validateRequest';
import { semesterRegistrationControllers } from './semesterRegistration.controller';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';

const route = express.Router();

route.post(
  '/create-semesterRegistration',
  validationRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  semesterRegistrationControllers.createSemesterRegistration
);

route.get('/', semesterRegistrationControllers.getAllSemesterRegistrations);
route.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration
);
route.patch(
  '/:id',
  validationRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  semesterRegistrationControllers.updateSemesterRegistration
);

export const semesterRegistrationRoutes = route;
