// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { JwtUtils } from '../utils/jwt';
import { AppError, ErrorType } from 'src/utils/error';

export interface AuthenticatedRequest extends Request {
  user?: { userId: number; email: string };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(ErrorType.Unauthorized, 'Authorization token missing');
  }

  const token = authHeader.split(' ')[1];

  const decoded = JwtUtils.verify(token);

  if (!decoded) {
    throw new AppError(ErrorType.Unauthorized, 'Invalid or expired token');
  }

  req.user = { userId: decoded.userId, email: decoded.email };
  next();
};
