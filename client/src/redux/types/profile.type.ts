import { UserType } from './user.type';

export type getUserReturnType = {
  ok: boolean;
  user: UserType | undefined;
  message: string | undefined;
};

export type getUserParamType = {
  id: string;
};

export type getUserErrorType = {
  ok: boolean;
  message: string;
};
