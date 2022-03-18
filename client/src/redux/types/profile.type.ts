export type ProfileType = {
  id: number;
  userId: string;
  email: string;
  nickname: string;
  desc: string;
  avatar: string;
  cover: string;
  role: string;
  exp: number;
  follow: boolean;
  followerNum: number;
  followingNum: number;
  created_at: Date;
  updated_at: Date;
};

export type getProfileReturnType = {
  ok: boolean;
  profile: ProfileType | undefined;
  message: string | undefined;
};

export type getProfileParamType = {
  profileId: number;
};

export type getProfileErrorType = {
  ok: boolean;
  message: string;
};

export type followReturnType = {
  ok: boolean;
  message: string | undefined;
};

export type followParamType = {
  profileId: number;
};

export type followErrorType = {
  ok: boolean;
  message: string;
};

export type unFollowReturnType = {
  ok: boolean;
  message: string | undefined;
};

export type unFollowParamType = {
  profileId: number;
};

export type unFollowErrorType = {
  ok: boolean;
  message: string;
};
