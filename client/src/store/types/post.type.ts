import { PostType } from '@src/types';

export type getPostReturnType = {
  ok: boolean;
  message: string;
  postJoinAll: PostType;
};

export type getPostDataType = {
  postId: number;
};

export type createPostReturnType = {
  ok: boolean;
  message: string;
  newPostJoinAll: PostType;
};

export type createPostDataType = {
  board: string;
  title: string;
  content: string;
  imageKeys: string[];
};

export type updatePostReturnType = {
  ok: boolean;
  message: string;
  updatedPostJoinAll: PostType;
};

export type updatePostDataType = {
  postId: number;
  title: string;
  content: string;
  imageKeys: string[];
};

export type deletePostReturnType = {
  ok: boolean;
  message: string;
  deletedPost: PostType;
};

export type deletePostDataType = {
  postId: number;
};

export type createCommentReturnType = {
  ok: boolean;
  message: string;
  newCommentJoinUser: any;
};

export type createCommentDataType = {
  board: string;
  postId: number;
  content: string;
};

export type updateCommentReturnType = {
  ok: boolean;
  message: string;
  udpatedCommentJoinUser: any;
};

export type updateCommentDataType = {
  commentId: number;
  updatedContent: string;
};

export type deleteCommentReturnType = {
  ok: boolean;
  message: string;
  deletedComment: any;
};

export type deleteCommentDataType = {
  commentId: number;
};

export type createLikeReturnType = {
  ok: boolean;
  message: string;
  newLike: any;
};

export type createLikeDataType = {
  postId: number;
  userId: number; // 게시글 작성자 id
};

export type createDisLikeReturnType = {
  ok: boolean;
  message: string;
  newDisLike: any;
};

export type createDisLikeDataType = {
  postId: number;
  userId: number; // 게시글 작성자 id
};
