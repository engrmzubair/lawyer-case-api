import { Request } from 'express';

export interface SuccessResponse<T> {
    status: 'success';
    message: string;
    data: T;
  }
  
  export interface ErrorResponse {
    status: 'error';
    message: string;
    errorCode?: string;
    details?: any;
  }
  
  interface User {
    userId: string;
    email: string;
  }
  
  export interface CustomRequest extends Request {
    user?: User;
  }