import { PostType } from '@src/types';

export type getBoardsReturnType = {
  ok: boolean;
  message: string;
  free: PostType[];
  drawingCommission: PostType[];
  drawingRequest: PostType[];
  drawingSale: PostType[];
};

export type getBoardsErrorType = {
  ok: boolean;
  message: string;
};

export type getBoardReturnType = {
  ok: boolean;
  message: string;
  posts: PostType[];
  totalPostsNum: number;
};

export type getBoardDataType = {
  board: string;
  page: number;
  limit: number;
};

export type getBoardErrorType = {
  ok: boolean;
  message: string;
};
