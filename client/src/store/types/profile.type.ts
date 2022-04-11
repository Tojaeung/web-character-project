import { ProfileType } from '@src/types';

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
