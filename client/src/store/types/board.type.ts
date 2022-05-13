import { PostCommentType, PostType } from '@src/types';

export type getAllBoardsReturnType = {
  ok: boolean;
  message: string;
  free: PostType[];
  commission: PostType[];
  reque: PostType[];
  sale: PostType[];
};

export type getBoardReturnType = {
  ok: boolean;
  message: string;
  posts: PostType[];
  totalPostsNum: number;
};

export type getBoardDataType = {
  board: string;
  queryString: string;
};

export type getAllMyPostsReturnType = {
  ok: boolean;
  message: string;
  allMyPosts: PostType[];
  totalPostsNum: number;
};

export type getAllMyPostsDataType = {
  page: number;
};

export type getAllMyCommentsReturnType = {
  ok: boolean;
  message: string;
  allMyComments: PostCommentType[];
  totalCommentsNum: number;
};

export type getAllMyCommentsDataType = {
  page: number;
};
