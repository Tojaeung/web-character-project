import { UserType } from './user.type';

export type loginReturnType = {
  token: string | undefined;
  ok: boolean | undefined;
  message: string;
  user: UserType | undefined;
};
export type loginParamType = {
  email: string;
  pw: string;
};
export type loginErrorType = {
  message: string;
};

export type logoutReturnType = {
  token: string | undefined;
  ok: boolean | undefined;
  message: string;
  user: UserType | undefined;
};

export type logoutErrorType = {
  message: string;
};

export type refreshTokenReturnType = {
  token: string | undefined;
  ok: boolean | undefined;
  message: string;
  user: UserType | undefined;
};

export type refreshTokenErrorType = { message: string };
