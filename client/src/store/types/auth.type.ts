import { UserType } from '@src/types';

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
