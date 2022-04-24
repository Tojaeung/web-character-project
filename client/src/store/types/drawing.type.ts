import { DrawingType, DrawingCommentType, DrawingDisLikeType, DrawingLikeType } from '@src/types';

export type getDrawingsReturnType = {
  ok: boolean;
  message: string;
  drawings: DrawingType[];
  newCursor: number | null;
};

export type getDrawingsDataType = {
  profileId: number;
  cursor: number;
};

export type getDrawingsErrorType = {
  ok: boolean;
  message: string;
};

export type addDrawingReturnType = {
  ok: boolean;
  message: string;
  newDrawing: DrawingType;
};
export type addDrawingDataType = {};
export type addDrawingErrorType = {
  ok: boolean;
  message: string;
};

export type removeDrawingReturnType = {
  ok: boolean;
  message: string;
  removedDrawingId: number;
};
export type removeDrawingDataType = {
  drawingId: number;
};
export type removeDrawingErrorType = {
  ok: boolean;
  message: string;
};

export type addViewReturnType = {
  ok: boolean;
  message: string;
  views: number;
};
export type addViewDataType = {
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
export type addCommentDataType = {
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
export type addLikeDataType = {
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
export type addDisLikeDataType = {
  userId: number;
  drawingId: number;
};
export type addDisLikeErrorType = {
  ok: boolean;
  message: string;
};

export type removeCommentReturnType = {
  ok: boolean;
  message: string;
  removedCommentId: number;
};
export type removeCommentDataType = {
  drawingCommentId: number;
};
export type removeCommentErrorType = {
  ok: boolean;
  message: string;
};

export type editCommentReturnType = {
  ok: boolean;
  message: string;
  drawingCommentId: number;
  editedContent: string;
};
export type editCommentDataType = {
  drawingCommentId: number;
  editedContent: string;
};
export type editCommentErrorType = {
  ok: boolean;
  message: string;
};
