import { UserType } from '@src/types';

export type signInReturnType = {
  ok: boolean;
  message: string;
  user: UserType;
};
export type signInDataType = {
  email: string;
  pw: string;
};

export type refreshLoginReturnType = {
  ok: boolean;
  message: string;
  user: UserType;
};

export type signOutReturnType = {
  ok: boolean;
  message: string;
};
