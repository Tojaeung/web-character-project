import { PostType } from '@src/types';

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
