// src/controllers/CaseController.ts

import { Request, Response, NextFunction } from 'express';
import { CaseService } from '../services/CaseService';
import { asyncHandler } from '../utils/asyncHandler';
import { SingleCaseResponse } from 'src/types/responses';
import { CustomRequest } from 'src/types/common';

export class CaseController {
  private caseService: CaseService;

  constructor() {
    this.caseService = new CaseService();
  }

  public createCase = asyncHandler(async (req: CustomRequest, res: Response) => {
    
    const body = { ...req.body, userId: req.user!.userId};
    const createdCase = await this.caseService.createCase(body);

    const response: SingleCaseResponse = {
      status: 'success',
      message: 'Case created successfully',
      data: createdCase,
    };

    res.status(201).json(response);
  });
}

export default new CaseController();
