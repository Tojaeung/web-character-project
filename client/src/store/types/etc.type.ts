import { UserType } from '@src/types';

export type sendReportReturnType = {
  ok: boolean;
  message: string;
};

export type sendReportParamType = {
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

export type getUserInfoParamType = {
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

export type calcExpParamType = {
  userId?: number;
  value: number;
};

export type calcExpErrorType = {
  ok: boolean;
  message: string;
};

export type delAccountByAdminReturnType = {
  ok: boolean;
  message: string;
};

export type delAccountByAdminParamType = {
  userId: number;
};

export type delAccountByAdminErrorType = {
  ok: boolean;
  message: string;
};
