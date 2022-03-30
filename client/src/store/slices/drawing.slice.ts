import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { DrawingType } from '@src/types';
import {
  getDrawings,
  addView,
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
  selectedIndex: number | null;
}

const initialState: DrawingSliceType = {
  isLoading: false,
  ok: false,
  message: null,
  drawings: [],
  selectedIndex: null,
};

export const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {
    selectIndex: (state, action: PayloadAction<{ index: number }>) => {
      state.selectedIndex = action.payload.index;
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
      state.ok = payload!.ok;
      state.message = payload!.message;
      state.drawings = [];
    });
    builder.addCase(addView.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const selectedIndex = state.selectedIndex;
      state.drawings[selectedIndex!].views += 1;
    });
    builder.addCase(addView.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });

    builder.addCase(addDrawingComment.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const selectedIndex = state.selectedIndex;
      state.drawings[selectedIndex!].drawingComments?.unshift(payload.addedComment);
    });
    builder.addCase(addDrawingComment.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(addDrawingLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const selectedIndex = state.selectedIndex;
      state.drawings[selectedIndex!].likes?.push(payload.addedLike);
    });
    builder.addCase(addDrawingLike.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(addDrawingDisLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const selectedIndex = state.selectedIndex;
      state.drawings[selectedIndex!].dislikes?.push(payload.addedDislike);
    });
    builder.addCase(addDrawingDisLike.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(removeDrawingLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const selectedIndex = state.selectedIndex;
      const filteredLikes = state.drawings[selectedIndex!]?.likes?.filter((like) => like.id !== payload.removedLikeId);

      state.drawings[selectedIndex!].likes = filteredLikes!;
    });
    builder.addCase(removeDrawingLike.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(removeDrawingDisLike.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const selectedIndex = state.selectedIndex;
      const filteredDisLikes = state.drawings[selectedIndex!]?.dislikes?.filter(
        (dislike) => dislike.id !== payload.removedDisLikeId
      );
      state.drawings[selectedIndex!].dislikes = filteredDisLikes!;
    });
    builder.addCase(removeDrawingDisLike.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });

    builder.addCase(removeDrawingComment.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const selectedIndex = state.selectedIndex;
      const filteredDrawingComment = state.drawings[selectedIndex!]?.drawingComments?.filter(
        (drawingComment) => drawingComment.id !== payload.removedCommentId
      );
      state.drawings[selectedIndex!].drawingComments = filteredDrawingComment!;
    });
    builder.addCase(removeDrawingComment.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
    builder.addCase(editDrawingComment.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const selectedIndex = state.selectedIndex;

      const editedCommentIndex = state.drawings[selectedIndex!]?.drawingComments?.findIndex(
        (drawingComment) => drawingComment.id === payload.editedComment.id
      );
      state.drawings[selectedIndex!].drawingComments![editedCommentIndex!].content! = payload.editedComment.content;
    });
    builder.addCase(editDrawingComment.rejected, (state, { payload }) => {
      state.ok = payload!.ok;
      state.message = payload!.message;
    });
  },
});

export const { selectIndex } = drawingSlice.actions;

export const selectDrawingIsLoading = (state: RootState) => state.drawing.isLoading;
export const selectDrawingOk = (state: RootState) => state.drawing.ok;
export const selectDrawingMessage = (state: RootState) => state.drawing.message;
export const selectDrawingDrawings = (state: RootState) => state.drawing.drawings;
export const selectDrawingIndex = (state: RootState) => state.drawing.selectedIndex;

export default drawingSlice.reducer;