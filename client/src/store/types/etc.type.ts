import { DrawingType, PostType, UserType } from '@src/types';

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
