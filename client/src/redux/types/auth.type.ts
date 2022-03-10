export type UserType = {
  id: number;
  userId: string;
  email: string;
  nickname: string;
  avatar: string;
  avatarKey: string;
  cover: string;
  coverKey: string;
  role: string;
  emailToken: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
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
