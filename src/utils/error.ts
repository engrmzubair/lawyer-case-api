export enum ErrorType {
    BadRequest = 'BadRequest',
    Unauthorized = 'Unauthorized',
    NotFound = 'NotFound',
    InternalServer = 'InternalServer',
  }
  
  export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    private static errorCodes = {
      [ErrorType.BadRequest]: 400,
      [ErrorType.Unauthorized]: 401,
      [ErrorType.NotFound]: 404,
      [ErrorType.InternalServer]: 500,
    };
  
    constructor(
      public errorType: ErrorType,
      public message: string,
      public details?: any
    ) {
      super(message);
      
      // Set default statusCode based on error type
      this.statusCode = AppError.errorCodes[errorType] || 500;
      this.isOperational = true;
  
      // Capturing stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const throwError = (
    errorType: ErrorType,
    message: string,
    details?: any
  ) => {
    throw new AppError(errorType, message, details);
  };
  