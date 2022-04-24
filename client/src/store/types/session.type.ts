import { UserType } from '@src/types';

export type signInReturnType = {
  ok: boolean;
  message: string | null;
  user: UserType | null;
};
export type signInDataType = {
  email: string;
  pw: string;
};
export type signInErrorType = {
  ok: boolean;
  message: string;
};

export type signOutReturnType = {
  ok: boolean;
  message: string;
};
export type signOutErrorType = {
  ok: boolean;
  message: string;
};
