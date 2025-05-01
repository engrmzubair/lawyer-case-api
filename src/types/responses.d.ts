import { SuccessResponse } from './common';
import { CaseResponse } from './case';
import { AuthData } from './auth';

export type AuthSuccessResponse = SuccessResponse<AuthData>;

export type SingleCaseResponse = SuccessResponse<CaseResponse>;

export type CaseListResponse = SuccessResponse<CaseResponse[]>;
