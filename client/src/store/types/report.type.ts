export type sendReportReturnType = {
  ok: boolean;
  message: string;
};

export type sendReportParamType = {
  reportType: string;
  report: string;
  url: string;
  suspect: string;
  title?: string;
  content?: string;
};
export type sendReportErrorType = {
  ok: boolean;
  message: string;
};
