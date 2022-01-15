import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  loginReturnType,
  loginParamType,
  loginErrorType,
  refreshTokenReturnType,
  refreshTokenErrorType,
  logoutReturnType,
  logoutErrorType,
} from '../types/auth.type';
import { RootState } from '../app/store';

export const loginUser = createAsyncThunk<
  loginReturnType,
  loginParamType,
  { state: RootState; rejectValue: loginErrorType }
>('LOGIN', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/login', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ message: err.response.data.message });
  }
});

export const logoutUser = createAsyncThunk<logoutReturnType, void, { state: RootState; rejectValue: logoutErrorType }>(
  'LOGOUT',
  async (_, thunkApi) => {
    try {
      const res = await axios.get('/api/logout', {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue({ message: err.response.data.message });
    }
  }
);

export const refreshToken = createAsyncThunk<
  refreshTokenReturnType,
  void,
  { state: RootState; rejectValue: refreshTokenErrorType }
>('REFRESH_TOKEN', async (_, thunkApi) => {
  try {
    const res = await axios.get('/api/refreshToken', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ message: err.response.data.message });
  }
});
