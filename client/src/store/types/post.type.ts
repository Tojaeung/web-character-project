import { PostCommentType, PostDisLikeType, PostLikeType, PostType } from '@src/types';

export type addViewReturnType = {
  ok: boolean;
  message: string;
  postId: number;
};

export type addViewDataType = {
  postId: number;
};

export type addViewErrorType = {
  ok: boolean;
  message: string;
};

export type getPostReturnType = {
  ok: boolean;
  message: string;
  post: PostType | null;
};

export type getPostDataType = {
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

export type addPostCommentDataType = {
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

export type imageUploadDataType = {};

export type imageUploadErrorType = {
  ok: boolean;
  message: string;
};

export type imageRemoveReturnType = {
  ok: boolean;
  message: string;
};

export type imageRemoveDataType = {
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

export type addPostDataType = {
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

export type editPostDataType = {
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
};

export type removePostDataType = {
  postId: number;
};

export type removePostErrorType = {
  ok: boolean;
  message: string;
};

export type removePostCommentReturnType = {
  ok: boolean;
  message: string;
  removedCommentId: number;
};

export type removePostCommentDataType = {
  postCommentId: number;
};

export type removePostCommentErrorType = {
  ok: boolean;
  message: string;
};

export type addPostLikeReturnType = {
  ok: boolean;
  message: string;
  addedLike: PostLikeType;
};

export type addPostLikeDataType = {
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

export type addPostDisLikeDataType = {
  userId: number;
  postId: number;
};

export type addPostDisLikeErrorType = {
  ok: boolean;
  message: string;
};

export type editPostCommentReturnType = {
  ok: boolean;
  message: string;
  editedCommentId: number;
  editedContent: string;
};

export type editPostCommentDataType = {
  postCommentId: number;
  editedContent: string;
};

export type editPostCommentErrorType = {
  ok: boolean;
  message: string;
};
