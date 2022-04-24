export type signUpReturnType = {
  ok: boolean;
  message: string | null;
};
export type signUpDataType = {
  email?: string | undefined;
  nickname?: string | undefined;
  pw?: string | undefined;
  confirmPw?: string | undefined;
};
export type signUpErrorType = {
  ok: boolean;
  message: string | null;
};

export type forgotPwReturnType = {
  ok: boolean;
  message: string | null;
};

export type forgotPwDataType = {
  email?: string;
};

export type forgotPwErrorType = {
  ok: boolean;
  message: string;
};

export type resetPwReturnType = {
  ok: boolean;
  message: string | null;
};

export type resetPwDataType = {
  pw: string;
  pwConfirmation: string;
  pwToken: string;
};

export type resetPwErrorType = {
  ok: boolean;
  message: string;
};
