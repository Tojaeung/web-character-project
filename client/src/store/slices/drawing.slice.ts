import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { DrawingType } from '@src/types';
import {
  getDrawings,
  addDrawingView,
  addDrawingComment,
  addDrawingLike,
  addDrawingDisLike,
  removeDrawingDisLike,
  removeDrawingLike,
  removeDrawingComment,
  editDrawingComment,
} from '../requests/drawing.request';

interface DrawingSliceType {
  isLoading: boolean;
  ok: boolean;
  message: string | null;
  drawings: DrawingType[];
  cursor: number | null;
  index: number | null;
}

const initialState: DrawingSliceType = {
  isLoading: false,
  ok: false,
  message: null,
  drawings: [],
  cursor: 0,
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
    builder.addCase(getDrawings.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDrawings.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ok = payload.ok;
      state.message = payload.message;
      payload.drawings!.forEach((drawing) => {
        state.drawings.push(drawing);
      });
      state.cursor = payload.newCursor;
    });
    builder.addCase(getDrawings.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.ok = payload!.ok;
      state.message = payload!.message;
      state.drawings = [];
      state.cursor = null;
    });
    builder.addCase(addDrawingView.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const index = state.index;
      state.drawings[index!]!.views += 1;
    });
    builder.addCase(addDrawingView.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });

    builder.addCase(addDrawingComment.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const index = state.index;
      state.drawings[index!]!.drawingComments?.push(payload.addedComment);
    });
    builder.addCase(addDrawingComment.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(addDrawingLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const index = state.index;
      state.drawings[index!]!.likes?.push(payload.addedLike);
    });
    builder.addCase(addDrawingLike.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(addDrawingDisLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const index = state.index;
      state.drawings[index!]!.dislikes?.push(payload.addedDislike);
    });
    builder.addCase(addDrawingDisLike.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(removeDrawingLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const index = state.index;
      const filteredLikes = state.drawings[index!]?.likes?.filter((like) => like.id !== payload.removedLikeId);
      state.drawings[index!]!.likes = filteredLikes!;
    });
    builder.addCase(removeDrawingLike.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(removeDrawingDisLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const index = state.index;
      const filteredDisLikes = state.drawings[index!]?.dislikes?.filter(
        (dislike) => dislike.id !== payload.removedDisLikeId
      );
      state.drawings[index!]!.dislikes = filteredDisLikes!;
    });
    builder.addCase(removeDrawingDisLike.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });

    builder.addCase(removeDrawingComment.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const index = state.index;
      const filteredDrawingComment = state.drawings[index!]?.drawingComments?.filter(
        (drawingComment) => drawingComment.id !== payload.removedCommentId
      );
      state.drawings[index!]!.drawingComments = filteredDrawingComment!;
    });
    builder.addCase(removeDrawingComment.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(editDrawingComment.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const index = state.index;
      const commentIndex = state.drawings[index!]?.drawingComments?.findIndex(
        (drawingComment) => drawingComment.id === payload.drawingCommentId
      );
      state.drawings[index!]!.drawingComments![commentIndex!].content! = payload.editedContent;
    });
    builder.addCase(editDrawingComment.rejected, (state, { payload }) => {
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
export const selectDrawingCursor = (state: RootState) => state.drawing.cursor;
export const selectDrawingIndex = (state: RootState) => state.drawing.index;

export default drawingSlice.reducer;
