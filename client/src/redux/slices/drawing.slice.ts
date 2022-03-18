import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { DrawingType } from '../types/drawing.type';
import {
  getDrawings,
  getDrawing,
  addComment,
  addLike,
  addDisLike,
  removeDisLike,
  removeLike,
} from '../requests/drawing.request';

interface DrawingSliceType {
  isLoading: boolean;
  ok: boolean | undefined;
  message: string | null | undefined;
  drawings: DrawingType[];
  drawing: DrawingType | null;
}

const initialState: DrawingSliceType = {
  isLoading: false,
  ok: false,
  message: null,
  drawings: [],
  drawing: null,
};

export const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {
    initDrawing: (state) => {
      state.drawing = null;
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
    });
    builder.addCase(getDrawings.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.drawings = [];
    });
    builder.addCase(getDrawing.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.drawing = payload.drawing;
    });
    builder.addCase(getDrawing.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.drawing = null;
    });
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.drawing?.comments?.unshift(payload.insertedComment);
    });
    builder.addCase(addComment.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
    });
    builder.addCase(addLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.drawing?.likes?.push(payload.insertedLike);
    });
    builder.addCase(addLike.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
    });
    builder.addCase(addDisLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.drawing?.dislikes?.push(payload.insertedDisLike);
    });
    builder.addCase(addDisLike.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
    });
    builder.addCase(removeLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const filteredLikes = state.drawing?.likes?.filter((like) => like.user_id !== payload.deletedUser);
      state.drawing!.likes = filteredLikes!;
    });
    builder.addCase(removeLike.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
    });
    builder.addCase(removeDisLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const filteredDisLikes = state.drawing?.dislikes?.filter((dislike) => dislike.user_id !== payload.deletedUser);
      state.drawing!.dislikes = filteredDisLikes!;
    });
    builder.addCase(removeDisLike.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
    });
  },
});

export const { initDrawing } = drawingSlice.actions;

export const selectDrawingIsLoading = (state: RootState) => state.drawing.isLoading;
export const selectDrawingOk = (state: RootState) => state.drawing.ok;
export const selectDrawingMessage = (state: RootState) => state.drawing.message;
export const selectDrawingDrawings = (state: RootState) => state.drawing.drawings;
export const selectDrawingDrawing = (state: RootState) => state.drawing.drawing;

export default drawingSlice.reducer;
