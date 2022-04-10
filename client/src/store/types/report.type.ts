export type sendReportReturnType = {
  ok: boolean;
  message: string;
};

export type sendReportParamType = {
  reportType: string;
  content: string;
  url: string;
  id: number;
  nickname: string;
};
export type sendReportErrorType = {
  ok: boolean;
  message: string;
};
