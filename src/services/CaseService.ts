// src/services/CaseService.ts

import { PrismaClient } from '@prisma/client';
import { AppError, ErrorType } from '../utils/error';
import { CaseOutcome, CaseStatus } from 'src/types/case';
import { CaseResponse } from 'src/types/case';

export class CaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createCase(data: {
    caseNumber: string;
    title: string;
    description: string;
    status: CaseStatus;
    clientName: string;
    startDate: string;
    endDate?: string;
    outcome: CaseOutcome;
    userId: number;
  }): Promise<CaseResponse> {  // Specify return type as CaseResponse
    const existingCase = await this.prisma.case.findUnique({
      where: { caseNumber: data.caseNumber },
    });

    if (existingCase) {
      throw new AppError(ErrorType.BadRequest, 'Case number already exists');
    }

    const createdCase = await this.prisma.case.create({
      data: {
        caseNumber: data.caseNumber,
        title: data.title,
        description: data.description,
        status: data.status,
        clientName: data.clientName,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        outcome: data.outcome,
        userId: data.userId,
      },
    });

    const caseResponse: CaseResponse = {
      id: createdCase.id,
      caseNumber: createdCase.caseNumber,
      title: createdCase.title,
      description: createdCase.description,
      clientName: createdCase.clientName,
      startDate: createdCase.startDate,
      endDate: createdCase.endDate,
      status: createdCase.status,
      outcome: createdCase.outcome,
      userId: createdCase.userId,
    };

    return caseResponse;
  }
}

export default CaseService;
