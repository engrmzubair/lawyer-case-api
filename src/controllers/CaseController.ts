// src/controllers/CaseController.ts

import { Request, Response, NextFunction } from 'express';
import { CaseService } from '../services/CaseService';
import { asyncHandler } from '../utils/asyncHandler';
import { SingleCaseResponse } from 'src/types/responses';

export class CaseController {
  private caseService: CaseService;

  constructor() {
    this.caseService = new CaseService();
  }

  public createCase = asyncHandler(async (req: Request, res: Response) => {
    const createdCase = await this.caseService.createCase(req.body);

    const response: SingleCaseResponse = {
      status: 'success',
      message: 'Case created successfully',
      data: createdCase,
    };

    res.status(201).json(response);
  });
}

export default new CaseController();
