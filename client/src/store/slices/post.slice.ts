import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { PostType } from '@src/types';
import { getPost, addPostComment } from '@src/store/requests/post.request';

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
        state.post?.postComments.unshift(payload.newPostComment!);
      })
      .addCase(addPostComment.rejected, (state, { payload }) => {
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
