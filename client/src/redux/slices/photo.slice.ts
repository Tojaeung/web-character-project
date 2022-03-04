import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { PhotoType } from '../types/photo.type';
import { getPhoto } from '../requests/photo.request';

interface profileType {
  isLoding: boolean;
  ok: boolean | undefined;
  photos: PhotoType[] | undefined;
  message: string | undefined;
}

const initialState: profileType = {
  isLoding: false,
  ok: undefined,
  photos: undefined,
  message: undefined,
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhoto.pending, (state) => {
      state.isLoding = true;
    });
    builder.addCase(getPhoto.fulfilled, (state, { payload }) => {
      state.isLoding = false;
      state.ok = payload.ok;
      state.message = payload.message;
      state.photos?.concat(payload.photos!);
    });
    builder.addCase(getPhoto.rejected, (state, { payload }) => {
      state.isLoding = false;
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.photos = undefined;
    });
  },
});

// export const {  } = authSlice.actions;
export const selectPhotoIsLoading = (state: RootState) => state.photo.isLoding;
export const selectPhotoOk = (state: RootState) => state.photo.ok;
export const selectPhotoPhotos = (state: RootState) => state.photo.photos;
export const selectPhotoMessage = (state: RootState) => state.photo.message;

export default photoSlice.reducer;
