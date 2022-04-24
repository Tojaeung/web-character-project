import { ProfileType } from '@src/types';

// GET_PROFILE
export type getProfileReturnType = {
  ok: boolean;
  message: string;
  profile: ProfileType;
};

export type getProfileDataType = {
  profileId: number;
};

export type getProfileErrorType = {
  ok: boolean;
  message: string;
};
