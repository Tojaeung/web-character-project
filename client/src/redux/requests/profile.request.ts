import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserParamType, getUserReturnType, getUserErrorType } from '../types/profile.type';
import { RootState } from '../app/store';

export const getUser = createAsyncThunk<
  getUserReturnType,
  getUserParamType,
  { state: RootState; rejectValue: getUserErrorType }
>('GET_PROFILE_USER', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/profile/getProfileUser', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
