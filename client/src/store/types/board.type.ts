import { PostType, PostCommentType } from '@src/types';

export type getBoardsReturnType = {
  ok: boolean;
  message: string;
  drawingCommissions: PostType[];
  drawingRequests: PostType[];
  drawingSales: PostType[];
};

export type getBoardsErrorType = {
  ok: boolean;
  message: string;
};

export type getBoardReturnType = {
  ok: boolean;
  message: string;
  boardName: string;
  board: PostType[];
};

export type getBoardParamType = {
  boardName: string;
};

export type getBoardErrorType = {
  ok: boolean;
  message: string;
};

export type getPostReturnType = {
  ok: boolean;
  message: string;
  post: PostType | null;
};

export type getPostParamType = {
  postId: number;
};

export type getPostErrorType = {
  ok: boolean;
  message: string;
};

export type addPostCommentReturnType = {
  ok: boolean;
  message: string;
  newPostComment: PostCommentType | null;
};

export type addPostCommentParamType = {
  userId: number;
  postId: number;
  content: string;
};

export type addPostCommentErrorType = {
  ok: boolean;
  message: string;
};
