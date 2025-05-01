import { Request, Response, NextFunction } from 'express';
import { AppError, ErrorType } from 'src/utils/error';
import { ZodSchema } from 'zod';
import { createUserSchema, createCaseSchema, loginSchema, updateCaseSchema } from 'src/utils/validators';

// Generic validation function for Zod schemas
const validateSchema = <T>(schema: ZodSchema<T>) => 
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      next(new AppError(ErrorType.BadRequest, 'Validation failed', error.errors));
    }
  };

export const validateCreateUser = validateSchema(createUserSchema);
export const validateCreateCase = validateSchema(createCaseSchema);
export const validateUpdateCase = validateSchema(updateCaseSchema);
export const validateLogin = validateSchema(loginSchema);
