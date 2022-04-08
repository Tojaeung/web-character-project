import { PostCommentType, PostDisLikeType, PostLikeType, PostType } from '@src/types';

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

export type editPostReturnType = {
  ok: boolean;
  message: string;
  editedPost: PostType;
};

export type editPostParamType = {
  postId: number;
  title: string;
  content: string;

  imageKeys: string[];
};

export type editPostErrorType = {
  ok: boolean;
  message: string;
};

export type removePostReturnType = {
  ok: boolean;
  message: string;
  removedCommentId: number;
};

export type removePostParamType = {
  postCommentId: number;
};

export type removePostErrorType = {
  ok: boolean;
  message: string;
};

export type addPostLikeReturnType = {
  ok: boolean;
  message: string;
  addedLike: PostLikeType;
};

export type addPostLikeParamType = {
  userId: number;
  postId: number;
};

export type addPostLikeErrorType = {
  ok: boolean;
  message: string;
};

export type addPostDisLikeReturnType = {
  ok: boolean;
  message: string;
  addedDisLike: PostDisLikeType;
};

export type addPostDisLikeParamType = {
  userId: number;
  postId: number;
};

export type addPostDisLikeErrorType = {
  ok: boolean;
  message: string;
};

export type removePostLikeReturnType = {
  ok: boolean;
  message: string;
  removedLikeUserId: number;
};

export type removePostLikeParamType = {
  userId: number;
};

export type removePostLikeErrorType = {
  ok: boolean;
  message: string;
};

export type removePostDisLikeReturnType = {
  ok: boolean;
  message: string;
  removedDisLikeUserId: number;
};

export type removePostDisLikeParamType = {
  userId: number;
};

export type removePostDisLikeErrorType = {
  ok: boolean;
  message: string;
};

export type editPostCommentReturnType = {
  ok: boolean;
  message: string;
  editedCommentId: number;
  editedContent: string;
};

export type editPostCommentParamType = {
  postCommentId: number;
  editedContent: string;
};

export type editPostCommentErrorType = {
  ok: boolean;
  message: string;
};
