import express, { RequestHandler, Router } from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();

const validationRequest: RequestHandler = (req, res, next) => {
    console.log('love you')
    next()
};

router.post('/create-student', validationRequest, UserControllers.createStudent);
router.post('/create-faculty');
router.post('/create-admin');

export const UserRoutes = router;
