import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getProfileParamType, getProfileReturnType, getProfileErrorType } from '@src/store/types/profile.type';
import { RootState } from '../app/store';

export const getProfile = createAsyncThunk<
  getProfileReturnType,
  getProfileParamType,
  { state: RootState; rejectValue: getProfileErrorType }
>('GET_PROFILE', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/profile/getProfile', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
