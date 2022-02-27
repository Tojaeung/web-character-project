export type UserType = {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  avatarKey: string;
  cover: string;
  covetKey: string;
  role: string;
  level: number;
};

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
  ok: boolean;
  message: string;
};

export type logoutReturnType = {
  ok: boolean | undefined;
  message: string;
};

export type logoutErrorType = {
  ok: boolean;
  message: string;
};

export type refreshLoginReturnType = {
  ok: boolean;
  message: string;
  user: UserType | undefined;
};

export type refreshLoginErrorType = {
  ok: boolean;
  message: string;
};
