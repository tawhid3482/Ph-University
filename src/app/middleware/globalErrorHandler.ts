import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // set default value
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  type TErrorSource = {
    path: string | number;
    message: string;
  }[];
  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    (statusCode = 400), (message = ' ami zod bolsi');
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: err,
  });
};
export default globalErrorHandler;
