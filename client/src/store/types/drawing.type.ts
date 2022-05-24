import { DrawingType, DrawingCommentType, DrawingDisLikeType, DrawingLikeType } from 'interfaces/index';

export type getDrawingsReturnType = {
  ok: boolean;
  message: string;
  drawings: DrawingType[];
  newCursor: number | null;
};

export type getDrawingsDataType = {
  userId: number;
  cursor: number;
};

export type incrementViewReturnType = {
  ok: boolean;
  message: string;
};
export type incrementViewDataType = {
  drawingId: number;
};

export type createDrawingReturnType = {
  ok: boolean;
  message: string;
  newDrawingJoinUser: DrawingType;
};
export type createDrawingDataType = {};

export type deleteDrawingReturnType = {
  ok: boolean;
  message: string;
  deletedDrawing: DrawingType;
};
export type deleteDrawingDataType = {
  drawingId: number;
};

export type createCommentReturnType = {
  ok: boolean;
  message: string;
  newCommentJoinUser: DrawingCommentType;
};
export type createCommentDataType = {
  drawingId: number;
  content: string;
};

export type updateCommentReturnType = {
  ok: boolean;
  message: string;
  udpatedCommentJoinUser: DrawingCommentType;
};
export type updateCommentDataType = {
  commentId: number;
  updatedContent: string;
};

export type deleteCommentReturnType = {
  ok: boolean;
  message: string;
  deletedComment: DrawingCommentType;
};
export type deleteCommentDataType = {
  commentId: number;
};

export type createLikeReturnType = {
  ok: boolean;
  message: string;
  newLike: DrawingLikeType;
};
export type createLikeDataType = {
  drawingId: number;
  userId: number; // 그림 게시자 id
};

export type createDisLikeReturnType = {
  ok: boolean;
  message: string;
  newDisLike: DrawingDisLikeType;
};
export type createDisLikeDataType = {
  drawingId: number;
  userId: number; // 그림 게시자 id
};
