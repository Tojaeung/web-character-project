import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { DrawingType } from '../types/drawing.type';
import { getDrawing } from '../requests/drawing.request';

interface DrawingSliceType {
  isLoading: boolean;
  ok: boolean | undefined;
  drawings: DrawingType[];
  message: string | undefined;
}

const initialState: DrawingSliceType = {
  isLoading: false,
  ok: undefined,
  drawings: [],
  message: undefined,
};

export const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDrawing.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDrawing.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ok = payload.ok;
      state.message = payload.message;
      state.drawings?.concat(payload.drawings!);
    });
    builder.addCase(getDrawing.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.drawings = [];
    });
  },
});

// export const {  } = authSlice.actions;

export const selectDrawingIsLoading = (state: RootState) => state.drawing.isLoading;
export const selectDrawingOk = (state: RootState) => state.drawing.ok;
export const selectDrawingDrawings = (state: RootState) => state.drawing.drawings;
export const selectDrawingMessage = (state: RootState) => state.drawing.message;

export default drawingSlice.reducer;
