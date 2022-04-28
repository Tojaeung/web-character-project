import { UserType } from '@src/types';

export type signUpReturnType = {
  ok: boolean;
  message: string;
};
export type signUpDataType = {
  email: string;
  nickname: string;
  pw: string;
  pwConfirmation: string;
};
export type signUpErrorType = {
  ok: boolean;
  message: string;
};

export type forgotPwReturnType = {
  ok: boolean;
  message: string;
};

export type forgotPwDataType = {
  email: string;
};

export type forgotPwErrorType = {
  ok: boolean;
  message: string;
};

export type resetPwReturnType = {
  ok: boolean;
  message: string;
};

export type resetPwDataType = {
  updatedPw: string;
  updatedPwConfirmation: string;
  pwToken: string;
};

export type resetPwErrorType = {
  ok: boolean;
  message: string;
};

export type getUserReturnType = {
  ok: boolean;
  message: string;
  user: UserType;
};

export type getUserDataType = {
  userId: number;
};

export type getUserErrorType = {
  ok: boolean;
  message: string;
};

export type verifyEmailReturnType = {
  ok: boolean;
  message: string;
};

export type verifyEmailDataType = {
  updatedEmail: string;
};

export type verifyEmailErrorType = {
  ok: boolean;
  message: string;
};

export type updateNicknameReturnType = {
  ok: boolean;
  message: string;
  updatedNickname: string;
};

export type updateNicknameDataType = {
  updatedNickname: string;
};

export type updateNicknameErrorType = {
  ok: boolean;
  message: string;
};

export type updatePwReturnType = {
  ok: boolean;
  message: string;
};

export type updatePwDataType = {
  currentPw: string;
  updatedPw: string;
  updatedPwConfirmation: string;
};

export type updatePwErrorType = {
  ok: boolean;
  message: string;
};

export type updateDescReturnType = {
  ok: boolean;
  message: string;
  updatedDesc: string;
};

export type updateDescDataType = {
  updatedDesc: string;
};

export type updateDescErrorType = {
  ok: boolean;
  message: string;
};

export type updateAvatarReturnType = {
  ok: boolean;
  message: string;
  updatedAvatar: string;
  updatedAvatarKey: string;
};

export type updateAvatarDataType = {};

export type updateAvatarErrorType = {
  ok: boolean;
  message: string;
};

export type updateDefaultAvatarReturnType = {
  ok: boolean;
  message: string;
  updatedAvatar: string;
  updatedAvatarKey: string;
};
export type updateDefaultAvatarErrorType = {
  ok: boolean;
  message: string;
};

export type updateCoverReturnType = {
  ok: boolean;
  message: string;
  updatedCover: string;
  updatedCoverKey: string;
};

export type updateCoverDataType = {};

export type updateCoverErrorType = {
  ok: boolean;
  message: string;
};

export type updateDefaultCoverReturnType = {
  ok: boolean;
  message: string;
  updatedCover: string;
  updatedCoverKey: string;
};

export type updateDefaultCoverErrorType = {
  ok: boolean;
  message: string;
};

export type deleteAccountReturnType = {
  ok: boolean;
  message: string;
};

export type deleteAccountErrorType = {
  ok: boolean;
  message: string;
};
