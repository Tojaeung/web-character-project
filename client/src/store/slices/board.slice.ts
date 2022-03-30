import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { PostType } from '@src/types';
import { getBoards, getBoard, getPost, addPostComment } from '@src/store/requests/board.request';

interface BoardType {
  ok: boolean;
  message: string | null;
  drawingCommission: PostType[] | null;
  drawingRequest: PostType[] | null;
  drawingSale: PostType[] | null;
  selectedBoard: PostType[] | null;
  post: PostType | null;
}

const initialState: BoardType = {
  ok: false,
  message: null,
  drawingCommission: null,
  drawingRequest: null,
  drawingSale: null,
  selectedBoard: null,
  post: null,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.drawingCommission = payload.drawingCommissions;
      state.drawingRequest = payload.drawingRequests;
      state.drawingSale = payload.drawingSales;
    });
    builder.addCase(getBoards.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
      state.drawingCommission = null;
      state.drawingRequest = null;
      state.drawingSale = null;
    });
    builder.addCase(getBoard.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.selectedBoard = payload.board;
      state.drawingCommission = null;
      state.drawingRequest = null;
      state.drawingSale = null;
    });
    builder.addCase(getBoard.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
      state.selectedBoard = null;
      state.drawingCommission = null;
      state.drawingRequest = null;
      state.drawingSale = null;
    });
    builder.addCase(getPost.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.post = payload.post;
      state.drawingCommission = null;
      state.drawingRequest = null;
      state.drawingSale = null;
    });
    builder.addCase(getPost.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
      state.post = null;
      state.selectedBoard = null;
      state.drawingCommission = null;
      state.drawingRequest = null;
      state.drawingSale = null;
    });
    builder.addCase(addPostComment.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.post?.postComments.unshift(payload.newPostComment!);
      state.drawingCommission = null;
      state.drawingRequest = null;
      state.drawingSale = null;
    });
    builder.addCase(addPostComment.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
      state.post = null;
      state.selectedBoard = null;
      state.drawingCommission = null;
      state.drawingRequest = null;
      state.drawingSale = null;
    });
  },
});

// export const { } = authSlice.actions;
export const selectBoardOk = (state: RootState) => state.board.ok;
export const selectBoardMessage = (state: RootState) => state.board.message;
export const selectBoardDrawingCommission = (state: RootState) => state.board.drawingCommission;
export const selectBoardDrawingRequest = (state: RootState) => state.board.drawingRequest;
export const selectBoardDrawingSale = (state: RootState) => state.board.drawingSale;
export const selectBoardSelectedBoard = (state: RootState) => state.board.selectedBoard;
export const selectBoardPost = (state: RootState) => state.board.post;

export default boardSlice.reducer;
