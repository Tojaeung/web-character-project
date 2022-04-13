import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { PostType } from '@src/types';
import { getBoard } from '@src/store/requests/board.request';
import { addView } from '@src/store/requests/post.request';

interface BoardType {
  ok: boolean;
  message: string | null;
  selectedBoard: PostType[] | null;
}

const initialState: BoardType = {
  ok: false,
  message: null,
  selectedBoard: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoard.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;

        state.selectedBoard = payload.selectedBoard;
      })
      .addCase(getBoard.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;

        state.selectedBoard = null;
      });
    builder
      .addCase(addView.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;

        state.selectedBoard?.map((post) => {
          if (post.id === payload.postId) {
            post.views += 1;
          }
        });
      })
      .addCase(addView.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
        state.selectedBoard = null;
      });
  },
});

// export const { } = authSlice.actions;
export const selectBoardOk = (state: RootState) => state.board.ok;
export const selectBoardMessage = (state: RootState) => state.board.message;
export const selectBoardSelectedBoard = (state: RootState) => state.board.selectedBoard;

export default boardSlice.reducer;
