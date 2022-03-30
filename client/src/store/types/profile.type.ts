import { ProfileType, FollowerType } from '@src/types';

// GET_PROFILE
export type getProfileReturnType = {
  ok: boolean;
  message: string;
  profile: ProfileType;
};

export type getProfileParamType = {
  profileId: number;
};

export type getProfileErrorType = {
  ok: boolean;
  message: string;
};

// FOLLOW
export type followReturnType = {
  ok: boolean;
  message: string;
  newFollower: FollowerType;
};

export type followParamType = {
  profileId: number;
  profileNickname: string;
};

export type followErrorType = {
  ok: boolean;
  message: string;
};

//UNFOLLOW
export type unFollowReturnType = {
  ok: boolean;
  message: string;
  userId: number;
};

export type unFollowParamType = {
  profileId: number;
  profileNickname: string;
};

export type unFollowErrorType = {
  ok: boolean;
  message: string;
};
