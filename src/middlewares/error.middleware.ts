import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("error => ", err);

  // fallback values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(err.details && { details: err.details }),
    ...(err.isOperational && { errorCode: err.errorType }),
  });
};
