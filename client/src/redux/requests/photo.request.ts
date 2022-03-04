import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getPhotoReturnType, getPhotoParamType, getPhotoErrorType } from '../types/photo.type';
import { RootState } from '../app/store';

export const getPhoto = createAsyncThunk<
  getPhotoReturnType,
  getPhotoParamType,
  { state: RootState; rejectValue: getPhotoErrorType }
>('GET_PHOTO', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/photo/getPhotos?cursor=${data.cursor}`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
