export type editEmailReturnType = {
  ok: boolean;
  message: string;
};

export type editEmailParamType = {
  email: string;
};

export type editEmailErrorType = {
  ok: boolean;
  message: string;
};

export type editNicknameReturnType = {
  ok: boolean;
  message: string;
  newNickname: string;
};

export type editNicknameParamType = {
  nickname: string;
};

export type editNicknameErrorType = {
  ok: boolean;
  message: string;
};

export type editPwReturnType = {
  ok: boolean;
  message: string;
};

export type editPwParamType = {
  currentPw: string;
  newPw: string;
};

export type editPwErrorType = {
  ok: boolean;
  message: string;
};

export type editAvatarReturnType = {
  ok: boolean;
  message: string;
  newAvatar: string;
  newAvatarKey: string;
};

export type editAvatarParamType = {};

export type editAvatarErrorType = {
  ok: boolean;
  message: string;
};

export type defaultAvatarReturnType = {
  ok: boolean;
  message: string;
  defaultAvatar: string;
  defaultAvatarKey: string;
};

export type defaultAvatarErrorType = {
  ok: boolean;
  message: string;
};

export type editCoverReturnType = {
  ok: boolean;
  message: string;
  newCover: string;
  newCoverKey: string;
};
export type editCoverParamType = {};

export type editCoverErrorType = {
  ok: boolean;
  message: string;
};

export type defaultCoverReturnType = {
  ok: boolean;
  message: string;
  defaultCover: string;
  defaultCoverKey: string;
};

export type defaultCoverErrorType = {
  ok: boolean;
  message: string;
};

export type editDescReturnType = {
  ok: boolean;
  message: string;
  desc: string;
};
export type editDescParamType = {
  desc: string;
};

export type editDescErrorType = {
  ok: boolean;
  message: string;
};

export type delAccountReturnType = {
  ok: boolean;
  message: string;
};

export type delAccountErrorType = {
  ok: boolean;
  message: string;
};
