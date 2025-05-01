import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthSuccessResponse } from 'src/types/responses';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public signup = asyncHandler(async (req: Request, res: Response) => {
    console.log("body => ", req.body);
    const result = await this.authService.signup(req.body);

    const response: AuthSuccessResponse = {
      status: 'success',
      message: 'User registered successfully',
      data: result,
    };

    res.status(201).json(response);
  });

  public signin = asyncHandler(async (req: Request, res: Response) => {
    const result = await this.authService.signin(req.body);

    const response: AuthSuccessResponse = {
      status: 'success',
      message: 'User signed in successfully',
      data: result,
    };

    res.status(200).json(response);
  });
}

export default new AuthController();
