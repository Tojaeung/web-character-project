import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { getDrawing } from '@src/redux/requests/profile.request';
import { DrawingType } from '@src/redux/types/profile.type';

interface profileType {
  isLoding: boolean;
  ok: boolean | undefined;
  drawings: DrawingType[] | undefined;
  message: string | undefined;
}

const initialState: profileType = {
  isLoding: false,
  ok: undefined,
  drawings: undefined,
  message: undefined,
};

export const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDrawing.pending, (state) => {
      state.isLoding = true;
    });
    builder.addCase(getDrawing.fulfilled, (state, { payload }) => {
      state.isLoding = false;
      state.ok = payload.ok;
      state.message = payload.message;
      state.drawings?.concat(payload.drawings!);
    });
    builder.addCase(getDrawing.rejected, (state, { payload }) => {
      state.isLoding = false;
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.drawings = undefined;
    });
  },
});

// export const {  } = authSlice.actions;
export const selectDrawingIsLoading = (state: RootState) => state.drawing.isLoding;
export const selectDrawingOk = (state: RootState) => state.drawing.ok;
export const selectDrawings = (state: RootState) => state.drawing.drawings;
export const selectDrawingMessage = (state: RootState) => state.drawing.message;

export default drawingSlice.reducer;
