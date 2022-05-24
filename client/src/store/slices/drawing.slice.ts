import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { DrawingType } from 'interfaces/index';
import {
  getDrawings,
  createDrawing,
  deleteDrawing,
  incrementView,
  createDrawingComment,
  updateDrawingComment,
  deleteDrawingComment,
  createDrawingLike,
  createDrawingDisLike,
} from '../requests/drawing.request';

interface DrawingSliceType {
  isLoading: boolean;
  ok: boolean;
  message: string | null;
  drawings: DrawingType[];
  index: number | null;
}

const initialState: DrawingSliceType = {
  isLoading: false,
  ok: false,
  message: null,
  drawings: [],
  index: null,
};

export const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {
    selectDrawing: (state, action: PayloadAction<{ selectedIndex: number }>) => {
      state.index = action.payload.selectedIndex;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDrawings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDrawings.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.ok = payload.ok;
        state.message = payload.message;
        state.drawings = state.drawings?.concat(payload.drawings);
      })
      .addCase(getDrawings.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.ok = payload!.ok;
        state.message = payload!.message;
        state.drawings = [];
      });

    builder
      .addCase(incrementView.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        const index = state.index;
        state.drawings[index!]!.views += 1;
      })
      .addCase(incrementView.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(createDrawing.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.drawings.unshift(payload.newDrawingJoinUser);
      })
      .addCase(createDrawing.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(deleteDrawing.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.drawings = state.drawings.filter((drawing) => drawing.id !== payload.deletedDrawing.id);
      })
      .addCase(deleteDrawing.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(createDrawingComment.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        const index = state.index;
        state.drawings[index!]!.comments?.unshift(payload.newCommentJoinUser);
      })
      .addCase(createDrawingComment.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(updateDrawingComment.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        const index = state.index;
        state.drawings[index!].comments = state.drawings[index!].comments?.map((comment) =>
          comment.id === payload.udpatedCommentJoinUser.id ? payload.udpatedCommentJoinUser : comment
        );
      })
      .addCase(updateDrawingComment.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(deleteDrawingComment.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        const index = state.index;
        state.drawings[index!].comments = state.drawings[index!].comments?.filter(
          (comment) => comment.id !== payload.deletedComment.id
        );
      })
      .addCase(deleteDrawingComment.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });

    builder
      .addCase(createDrawingLike.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        const index = state.index;
        state.drawings[index!]!.likes?.push(payload.newLike);
      })
      .addCase(createDrawingLike.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
    builder
      .addCase(createDrawingDisLike.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        const index = state.index;
        state.drawings[index!]!.dislikes?.push(payload.newDisLike);
      })
      .addCase(createDrawingDisLike.rejected, (state, { payload }) => {
        state.ok = payload!.ok;
        state.message = payload!.message;
      });
  },
});

export const { selectDrawing } = drawingSlice.actions;

export const selectDrawingIsLoading = (state: RootState) => state.drawing.isLoading;
export const selectDrawingOk = (state: RootState) => state.drawing.ok;
export const selectDrawingMessage = (state: RootState) => state.drawing.message;
export const selectDrawingDrawings = (state: RootState) => state.drawing.drawings;
export const selectDrawingIndex = (state: RootState) => state.drawing.index;

export default drawingSlice.reducer;
