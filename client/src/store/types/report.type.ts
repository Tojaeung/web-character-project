import { DrawingType, PostType } from '@src/types';

export type sendReportReturnType = {
  ok: boolean;
  message: string;
};

export type sendReportParamType = {
  reportType: string;
  report: string;
  url: string;
  proof: DrawingType | PostType;
};
export type sendReportErrorType = {
  ok: boolean;
  message: string;
};
