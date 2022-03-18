import { UserType } from './auth.type';

export type CommentType = {
  id: number;
  comment: string;
  user_id: number;
  drawing_id: number;
  created_at: Date;
  user: UserType;
};

export type LikeType = {
  id: number;
  user_id: number;
  drawing_id: number;
};

export type DisLikeType = {
  id: number;
  user_id: number;
  drawing_id: number;
};

export type DrawingType = {
  id: number;
  title: string;
  content: string;
  url: string;
  key: string;
  views: number;
  user_id: number;
  comments: CommentType[] | null;
  likes: LikeType[] | null;
  dislikes: DisLikeType[] | null;
  created_at: Date;
  updated_at: Date;
};

export type getDrawingsReturnType = {
  ok: boolean;
  drawings: DrawingType[] | undefined;
  message: string | null;
  newCursor: number;
};

export type getDrawingsParamType = {
  profileId: number | undefined;
  cursor: number | null;
};

export type getDrawingsErrorType = {
  ok: boolean | undefined;
  message: string | null | undefined;
};

export type getDrawingReturnType = {
  ok: boolean;
  message: string | null;
  drawing: DrawingType | null;
};

export type getDrawingParamType = {
  drawingId: number;
};

export type getDrawingErrorType = {
  ok: boolean | undefined;
  message: string | null | undefined;
};

export type addCommentReturnType = {
  ok: boolean;
  message: string | null;
  insertedComment: CommentType;
};
export type addCommentParamType = {
  comment: string;
  userId: number;
  drawingId: number;
};
export type addCommentErrorType = {
  ok: boolean | undefined;
  message: string | null | undefined;
};

export type addLikeReturnType = {
  ok: boolean;
  message: string | null;
  insertedLike: LikeType;
};
export type addLikeParamType = {
  userId: number;
  drawingId: number;
};
export type addLikeErrorType = {
  ok: boolean | undefined;
  message: string | null | undefined;
};

export type addDisLikeReturnType = {
  ok: boolean;
  message: string | null;
  insertedDisLike: DisLikeType;
};
export type addDisLikeParamType = {
  userId: number;
  drawingId: number;
};
export type addDisLikeErrorType = {
  ok: boolean | undefined;
  message: string | null | undefined;
};

export type removeLikeReturnType = {
  ok: boolean;
  message: string | null;
  deletedUser: number;
};
export type removeLikeParamType = {
  userId: number;
};
export type removeLikeErrorType = {
  ok: boolean | undefined;
  message: string | null | undefined;
};

export type removeDisLikeReturnType = {
  ok: boolean;
  message: string | null;
  deletedUser: number;
};
export type removeDisLikeParamType = {
  userId: number;
};
export type removeDisLikeErrorType = {
  ok: boolean | undefined;
  message: string | null | undefined;
};
