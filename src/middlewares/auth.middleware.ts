// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError, ErrorType } from 'src/utils/error';

export interface AuthenticatedRequest extends Request {
  user?: { userId: number };
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

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as { userId: number };
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    throw new AppError(ErrorType.Unauthorized, 'Invalid or expired token');
  }
};
