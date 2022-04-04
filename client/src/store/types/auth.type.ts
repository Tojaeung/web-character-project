import { UserType } from '@src/types';

export type signUpReturnType = {
  ok: boolean;
  message: string | null;
};
export type signUpParamType = {
  email?: string | undefined;
  nickname?: string | undefined;
  pw?: string | undefined;
  confirmPw?: string | undefined;
};
export type signUpErrorType = {
  ok: boolean;
  message: string | null;
};

export type loginReturnType = {
  ok: boolean;
  message: string | null;
  user: UserType | null;
};
export type loginParamType = {
  email: string;
  pw: string;
};
export type loginErrorType = {
  ok: boolean;
  message: string;
};

export type logoutReturnType = {
  ok: boolean;
  message: string | null;
};

export type logoutErrorType = {
  ok: boolean;
  message: string;
};

export type refreshLoginReturnType = {
  ok: boolean;
  message: string | null;
  user: UserType | null;
};

export type refreshLoginErrorType = {
  ok: boolean;
  message: string;
};

export type findPwReturnType = {
  ok: boolean;
  message: string | null;
};

export type findPwParamType = {
  email?: string;
};

export type findPweErrorType = {
  ok: boolean;
  message: string;
};

export type editPwReturnType = {
  ok: boolean;
  message: string | null;
};

export type editPwParamType = {
  pw: string;
  pwToken: string;
};

export type editPwErrorType = {
  ok: boolean;
  message: string;
};
