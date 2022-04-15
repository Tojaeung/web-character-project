import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { PostType } from '@src/types';
import {
  addView,
  getPost,
  addPostComment,
  removePostComment,
  editPostComment,
  addPostLike,
  addPostDisLike,
  editPost,
  removePost,
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
      .addCase(addView.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post!.views += 1;
      })
      .addCase(addView.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
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
      .addCase(editPostComment.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post?.postComments.map((comment) => {
          if (comment.id === payload.editedCommentId) {
            comment.content = payload.editedContent;
          }
        });
      })
      .addCase(editPostComment.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(editPost.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post = payload.editedPost;
      })
      .addCase(editPost.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(removePost.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.post = null;
      })
      .addCase(removePost.rejected, (state, { payload }) => {
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
