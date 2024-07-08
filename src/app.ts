import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/students/student.route';
import { UserRoutes } from './app/modules/users/user.route';
import globarErrorHandler from './app/middleware/globalErrorHandler';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes

app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/users', UserRoutes)


const getAController = (req: Request, res: Response) => {
  const a = 10;
  
  res.send(a);
};

app.get('/', getAController);

app.use(globarErrorHandler)

export default app;
