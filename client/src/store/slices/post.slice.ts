import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { PostType } from '@src/types';
import { getPost, addPostComment, removePostComment, editPostComment } from '@src/store/requests/post.request';

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
