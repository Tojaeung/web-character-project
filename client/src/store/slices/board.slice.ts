import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { PostType } from '@src/types';
import { getBoards, getBoard } from '@src/store/requests/board.request';
import { addView } from '@src/store/requests/post.request';

interface BoardType {
  ok: boolean;
  message: string | null;
  free: PostType[] | null;
  drawingCommission: PostType[] | null;
  drawingRequest: PostType[] | null;
  drawingSale: PostType[] | null;
  selectedBoard: PostType[] | null;
}

const initialState: BoardType = {
  ok: false,
  message: null,
  free: [],
  drawingCommission: [],
  drawingRequest: [],
  drawingSale: [],
  selectedBoard: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.free = payload.free;
        state.drawingCommission = payload.drawingCommission;
        state.drawingRequest = payload.drawingRequest;
        state.drawingSale = payload.drawingSale;
        state.selectedBoard = null;
      })
      .addCase(getBoards.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
        state.free = null;
        state.drawingCommission = null;
        state.drawingRequest = null;
        state.drawingSale = null;
        state.selectedBoard = null;
      });
    builder
      .addCase(getBoard.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.free = null;
        state.drawingCommission = null;
        state.drawingRequest = null;
        state.drawingSale = null;
        state.selectedBoard = payload.selectedBoard;
      })
      .addCase(getBoard.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
        state.free = null;
        state.drawingCommission = null;
        state.drawingRequest = null;
        state.drawingSale = null;
        state.selectedBoard = null;
      });
    builder
      .addCase(addView.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.free = null;
        state.drawingCommission = null;
        state.drawingRequest = null;
        state.drawingSale = null;
        state.selectedBoard?.map((post) => {
          if (post.id === payload.postId) {
            post.views += 1;
          }
        });
      })
      .addCase(addView.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
        state.free = null;
        state.drawingCommission = null;
        state.drawingRequest = null;
        state.drawingSale = null;
        state.selectedBoard = null;
      });
  },
});

// export const { } = authSlice.actions;
export const selectBoardOk = (state: RootState) => state.board.ok;
export const selectBoardMessage = (state: RootState) => state.board.message;
export const selectBoardFree = (state: RootState) => state.board.free;
export const selectBoardDrawingCommission = (state: RootState) => state.board.drawingCommission;
export const selectBoardDrawingRequest = (state: RootState) => state.board.drawingRequest;
export const selectBoardDrawingSale = (state: RootState) => state.board.drawingSale;
export const selectBoardSelectedBoard = (state: RootState) => state.board.selectedBoard;

export default boardSlice.reducer;
