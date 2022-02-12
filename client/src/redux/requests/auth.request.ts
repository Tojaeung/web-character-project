import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  loginReturnType,
  loginParamType,
  loginErrorType,
  refreshLoginReturnType,
  refreshLoginErrorType,
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
    const res = await axios.post('/api/auth/login', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const logoutUser = createAsyncThunk<logoutReturnType, void, { state: RootState; rejectValue: logoutErrorType }>(
  'LOGOUT',
  async (_, thunkApi) => {
    try {
      const res = await axios.get('/api/auth/logout', {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
    }
  }
);

export const refreshLogin = createAsyncThunk<
  refreshLoginReturnType,
  void,
  { state: RootState; rejectValue: refreshLoginErrorType }
>('REFRESH_LOGIN', async (_, thunkApi) => {
  try {
    const res = await axios.get('/api/auth/login', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
