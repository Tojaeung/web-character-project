import { DrawingType, DrawingCommentType, DrawingDisLikeType, DrawingLikeType } from '@src/types';

export type getDrawingsReturnType = {
  ok: boolean;
  message: string;
  drawings: DrawingType[];
  newCursor: number | null;
};

export type getDrawingsParamType = {
  profileId: number;
  cursor: number;
};

export type getDrawingsErrorType = {
  ok: boolean;
  message: string;
};

export type addViewReturnType = {
  ok: boolean;
  message: string;
  views: number;
};
export type addViewParamType = {
  drawingId: number;
};
export type addViewErrorType = {
  ok: boolean;
  message: string;
};

export type addCommentReturnType = {
  ok: boolean;
  message: string;
  addedComment: DrawingCommentType;
};
export type addCommentParamType = {
  content: string;
  userId: number;
  drawingId: number;
};
export type addCommentErrorType = {
  ok: boolean;
  message: string;
};

export type addLikeReturnType = {
  ok: boolean;
  message: string;
  addedLike: DrawingLikeType;
};
export type addLikeParamType = {
  userId: number;
  drawingId: number;
};
export type addLikeErrorType = {
  ok: boolean;
  message: string;
};

export type addDisLikeReturnType = {
  ok: boolean;
  message: string;
  addedDislike: DrawingDisLikeType;
};
export type addDisLikeParamType = {
  userId: number;
  drawingId: number;
};
export type addDisLikeErrorType = {
  ok: boolean;
  message: string;
};

export type removeLikeReturnType = {
  ok: boolean;
  message: string;
  removedLikeId: number;
};
export type removeLikeParamType = {
  userId: number;
  drawingId: number;
};
export type removeLikeErrorType = {
  ok: boolean;
  message: string;
};

export type removeDisLikeReturnType = {
  ok: boolean;
  message: string;
  removedDisLikeId: number;
};
export type removeDisLikeParamType = {
  userId: number;
  drawingId: number;
};
export type removeDisLikeErrorType = {
  ok: boolean;
  message: string;
};

export type removeCommentReturnType = {
  ok: boolean;
  message: string;
  removedCommentId: number;
};
export type removeCommentParamType = {
  drawingCommentId: number;
};
export type removeCommentErrorType = {
  ok: boolean;
  message: string;
};

export type editCommentReturnType = {
  ok: boolean;
  message: string;
  editedComment: DrawingCommentType;
};
export type editCommentParamType = {
  drawingCommentId: number;
  editedContent: string;
};
export type editCommentErrorType = {
  ok: boolean;
  message: string;
};
