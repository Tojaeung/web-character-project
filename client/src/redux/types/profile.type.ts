import { UserType } from './user.type';

export type ProfileType = {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  exp: number;
  desc: { id: number; content: string; user_id: number };
  followerNum: number;
  followingNum: number;
};

export type getUserReturnType = {
  ok: boolean;
  user: ProfileType | undefined;
  message: string | undefined;
};

export type getUserParamType = {
  id: string;
};

export type getUserErrorType = {
  ok: boolean;
  message: string;
};
