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

export type forgotPwReturnType = {
  ok: boolean;
  message: string;
};

export type forgotPwDataType = {
  email: string;
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

export type getUserReturnType = {
  ok: boolean;
  message: string;
  user: UserType;
};

export type getUserDataType = {
  userId: number;
};

export type updateEmailReturnType = {
  ok: boolean;
  message: string;
};

export type updateEmailDataType = {
  updatedEmail: string;
};

export type updateNicknameReturnType = {
  ok: boolean;
  message: string;
  updatedNickname: string;
};

export type updateNicknameDataType = {
  updatedNickname: string;
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

export type updateDescReturnType = {
  ok: boolean;
  message: string;
  updatedDesc: string;
};

export type updateDescDataType = {
  updatedDesc: string;
};

export type updateAvatarReturnType = {
  ok: boolean;
  message: string;
  updatedAvatar: string;
  updatedAvatarKey: string;
};

export type updateAvatarDataType = {};

export type updateDefaultAvatarReturnType = {
  ok: boolean;
  message: string;
  updatedAvatar: string;
  updatedAvatarKey: string;
};

export type updateCoverReturnType = {
  ok: boolean;
  message: string;
  updatedCover: string;
  updatedCoverKey: string;
};

export type updateCoverDataType = {};

export type updateDefaultCoverReturnType = {
  ok: boolean;
  message: string;
  updatedCover: string;
  updatedCoverKey: string;
};

export type sendReportReturnType = {
  ok: boolean;
  message: string;
};

export type sendReportDataType = {
  reportType: string;
  report: string;
  url: string;
  suspectId: number;
};

export type getUserInfoReturnType = {
  ok: boolean;
  message: string;
  user: UserType;
  drawingsNum: number;
  totalPostsNum: number;
  totalCommentsNum: number;
};

export type getUserInfoDataType = {
  userId: number;
};

export type givePenaltyReturnType = {
  ok: boolean;
  message: string;
};

export type givePenaltyDataType = {
  userId: number;
  penaltyPeriod: number;
};

export type deleteAccountReturnType = {
  ok: boolean;
  message: string;
};
