import { PostCommentType, PostType } from '@src/types';

export type getPostReturnType = {
  ok: boolean;
  message: string;
  post: PostType | null;
};

export type getPostParamType = {
  postId: string | number;
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

export type imageUploadReturnType = {
  ok: boolean;
  message: string;
  imageUrl: string;
  imageKey: string;
};

export type imageUploadParamType = {};

export type imageUploadErrorType = {
  ok: boolean;
  message: string;
};

export type imageRemoveReturnType = {
  ok: boolean;
  message: string;
};

export type imageRemoveParamType = {
  imageKeys: string[];
};

export type imageRemoveErrorType = {
  ok: boolean;
  message: string;
};

export type addPostReturnType = {
  ok: boolean;
  message: string;
  post: PostType;
};

export type addPostParamType = {
  title: string;
  content: string;
  board: string;
  imageKeys: string[];
};

export type addPostErrorType = {
  ok: boolean;
  message: string;
};
