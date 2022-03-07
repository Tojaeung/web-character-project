export type ProfileType = {
  id: string;
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

interface DrawingTagType {
  id: number;
  tag: string;
  drawing_id: number;
}
interface CommentType {
  id: number;
  comment: string;
  user_id: number;
  drawing_id: number;
  createAt: Date;
  user: UserType;
}

interface UserType {
  id: number;
  nickname: string;
  level: number;
  avatar: string;
}

export type DrawingType = {
  id: number;
  title: string;
  content: string;
  url: string;
  key: string;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
  drawingTags: DrawingTagType;
  comments: CommentType;
};
export type getDrawingReturnType = {
  ok: boolean;
  drawings: DrawingType[] | undefined;
  message: string | undefined;
  newCursor: number;
};

export type getDrawingParamType = {
  profileId: string | undefined;
  cursor: number | null;
};

export type getDrawingErrorType = {
  ok: boolean;
  message: string;
};
