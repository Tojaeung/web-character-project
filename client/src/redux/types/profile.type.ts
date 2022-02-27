export type ProfileType = {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  avatarKey: string;
  level: number;
  desc: string;
  isFollowing: boolean | undefined;
  followerNum: number;
  followeeNum: number;
};

export type getUserReturnType = {
  ok: boolean;
  profile: ProfileType | undefined;
  message: string | undefined;
};

export type getUserParamType = {
  profileId: string;
};

export type getUserErrorType = {
  ok: boolean;
  message: string;
};

export type followReturnType = {
  ok: boolean;
  message: string | undefined;
};

export type followParamType = {
  profileId: string;
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
  profileId: string;
};

export type unFollowErrorType = {
  ok: boolean;
  message: string;
};
