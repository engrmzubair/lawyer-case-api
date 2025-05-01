export enum CaseStatus {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
  }
  
  export enum CaseOutcome {
    WON = 'WON',
    LOST = 'LOST',
    SETTLED = 'SETTLED',
    DISMISSED = 'DISMISSED',
  }
  
  export interface CaseInput {
    caseNumber: string;
    title: string;
    description: string;
    clientName: string;
    startDate: Date;
    endDate?: Date;
    status: CaseStatus;
    outcome: CaseOutcome;
  }
  
  export interface CaseResponse extends CaseInput {
    id: number;
    userId: number;
  }
  