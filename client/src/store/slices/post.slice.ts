import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { PostType } from '@src/types';
import {
  getPost,
  addPostComment,
  removePostComment,
  editPostComment,
  addPostLike,
  addPostDisLike,
  removePostLike,
  removePostDisLike,
} from '@src/store/requests/post.request';

interface PostSliceType {
  ok: boolean;
  message: string | null;
  post: PostType | null;
}

const initialState: PostSliceType = {
  ok: false,
  message: null,
  post: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post = payload.post;
      })
      .addCase(getPost.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(addPostComment.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post?.postComments.push(payload.newPostComment!);
      })
      .addCase(addPostComment.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(removePostComment.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;

        const filteredComments = state.post?.postComments.filter((comment) => comment.id !== payload.removedCommentId);

        state.post!.postComments = filteredComments!;
      })
      .addCase(removePostComment.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(addPostLike.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post?.likes.push(payload.addedLike!);
      })
      .addCase(addPostLike.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(addPostDisLike.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post?.dislikes.push(payload.addedDisLike!);
      })
      .addCase(addPostDisLike.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(removePostLike.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        const filteredLike = state.post?.likes.filter((like) => like.user_id !== payload.removedLikeUserId);
        state.post!.likes = filteredLike!;
      })
      .addCase(removePostLike.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(removePostDisLike.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        const filteredDisLike = state.post?.dislikes.filter(
          (dislike) => dislike.user_id !== payload.removedDisLikeUserId
        );
        state.post!.dislikes = filteredDisLike!;
      })
      .addCase(removePostDisLike.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(editPostComment.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        const commentIndex = state.post?.postComments.findIndex((comment) => comment.id === payload.editedCommentId);

        state.post!.postComments[commentIndex!].content = payload.editedContent!;
      })
      .addCase(editPostComment.rejected, (state, { payload }) => {
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
