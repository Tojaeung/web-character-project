import { UserType } from './user.type';

export type loginReturnType = {
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
  ok: boolean | undefined;
  message: string;
};

export type logoutErrorType = {
  message: string;
};

export type refreshLoginReturnType = {
  ok: boolean | undefined;
  message: string;
  user: UserType | undefined;
};

export type refreshLoginErrorType = { message: string };
