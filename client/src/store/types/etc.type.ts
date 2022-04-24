import { UserType } from '@src/types';

export type sendReportReturnType = {
  ok: boolean;
  message: string;
};

export type sendReportDataType = {
  reportType: string;
  report: string;
  url: string;
  suspectId: number;
};
export type sendReportErrorType = {
  ok: boolean;
  message: string;
};

export type getUserInfoReturnType = {
  ok: boolean;
  message: string;
  userInfo: UserType;
  drawingsNum: number;
  drawingCommentsNum: number;
  postsNum: number;
  postCommentsNum: number;
};

export type getUserInfoDataType = {
  userId: number;
};
export type getUserInfoErrorType = {
  ok: boolean;
  message: string;
};

export type calcExpReturnType = {
  ok: boolean;
  message: string;
  calcedValue: number;
};

export type calcExpDataType = {
  userId?: number;
  value: number;
};

export type calcExpErrorType = {
  ok: boolean;
  message: string;
};

export type penaltyByAdminReturnType = {
  ok: boolean;
  message: string;
};

export type penaltyByAdminDataType = {
  userId: number;
  penaltyPeriod: number;
};

export type penaltyByAdminErrorType = {
  ok: boolean;
  message: string;
};
