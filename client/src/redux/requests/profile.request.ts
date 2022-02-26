import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getUserParamType,
  getUserReturnType,
  getUserErrorType,
  followReturnType,
  followParamType,
  unFollowReturnType,
  unFollowParamType,
  unFollowErrorType,
} from '../types/profile.type';
import { RootState } from '../app/store';

export const getProfile = createAsyncThunk<
  getUserReturnType,
  getUserParamType,
  { state: RootState; rejectValue: getUserErrorType }
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

export const follow = createAsyncThunk<
  followReturnType,
  followParamType,
  { state: RootState; rejectValue: followReturnType }
>('FOLLOW', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/profile/follow', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const unFollow = createAsyncThunk<
  unFollowReturnType,
  unFollowParamType,
  { state: RootState; rejectValue: unFollowErrorType }
>('UNFOLLOW', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/profile/unFollow', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
