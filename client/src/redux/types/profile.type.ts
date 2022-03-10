export type ProfileType = {
  id: number;
  userId: string;
  email: string;
  nickname: string;
  avatar: string;
  avatarKey: string;
  cover: string;
  coverKey: string;
  role: string;
  level: number;
  isFollowing: boolean | undefined;
  followerNum: number;
  followeeNum: number;
};

export type getProfileReturnType = {
  ok: boolean;
  profile: ProfileType | undefined;
  message: string | undefined;
};

export type getProfileParamType = {
  profileId: string;
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
