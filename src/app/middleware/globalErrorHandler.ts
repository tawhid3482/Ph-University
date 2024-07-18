import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // set default value
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';


  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  const handleZodError = (err: ZodError) => {
    const errorSources :TErrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    const statusCode = 400;
    return {
      statusCode,
      message: 'Zod validation Error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};
export default globalErrorHandler;
