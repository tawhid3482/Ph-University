import express from 'express';
import validationRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser
);
router.post(
  '/change-password',
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
