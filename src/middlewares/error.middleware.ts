import { Request, Response, NextFunction } from 'express';
import { AppError } from 'src/utils/error';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode, message, isOperational, details } = err;

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(details && { details }),
    ...(isOperational && { errorCode: err.errorType }),
  });
};
