import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { PostType } from 'interfaces/index';
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  createPostComment,
  updatePostComment,
  deletePostComment,
  createPostLike,
  createPostDisLike,
} from 'store/requests/post.request';

interface PostSliceType {
  ok: boolean;
  message: string | null;
  post: PostType | null;
}

const initialState: PostSliceType = {
  ok: false,
  message: null,
  post: null, // 게시글
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post = payload.newPostJoinAll;
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(getPost.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post = payload.postJoinAll;
      })
      .addCase(getPost.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post = payload.updatedPostJoinAll;
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post = null;
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(createPostComment.fulfilled, (state, { payload }) => {
        const { newCommentJoinUser } = payload;
        state.ok = payload.ok;
        state.message = payload.message;
        state.post?.comments?.push(newCommentJoinUser);
      })
      .addCase(createPostComment.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(updatePostComment.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post!.comments = state.post?.comments?.map((comment) => {
          return comment.id === payload.updatedCommentJoinUser.id ? payload.updatedCommentJoinUser : comment;
        });
      })
      .addCase(updatePostComment.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(deletePostComment.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post!.comments = state.post?.comments?.filter((comment) => comment.id !== payload.deletedComment.id);
      })
      .addCase(deletePostComment.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(createPostLike.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post?.likes?.push(payload.newLike);
      })
      .addCase(createPostLike.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(createPostDisLike.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post?.dislikes?.push(payload.newDisLike);
      })
      .addCase(createPostDisLike.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
  },
});

// export const { } = authSlice.actions;
export const selectPostOk = (state: RootState) => state.post.ok;
export const selectPostMessage = (state: RootState) => state.post.message;
export const selectPostPost = (state: RootState) => state.post.post;

export default postSlice.reducer;
