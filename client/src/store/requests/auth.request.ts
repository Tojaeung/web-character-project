import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  signUpErrorType,
  signUpParamType,
  signUpReturnType,
  loginReturnType,
  loginParamType,
  loginErrorType,
  refreshLoginReturnType,
  refreshLoginErrorType,
  logoutErrorType,
  findPwParamType,
  findPwReturnType,
  findPweErrorType,
  editPwParamType,
  editPwReturnType,
  editPwErrorType,
} from '../types/auth.type';
import { RootState } from '../app/store';

export const signUp = createAsyncThunk<
  signUpReturnType,
  signUpParamType,
  { state: RootState; rejectValue: signUpErrorType }
>('SIGN_UP', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/auth/signUp', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

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

export const logoutUser = createAsyncThunk<void, void, { state: RootState; rejectValue: logoutErrorType }>(
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

export const findPw = createAsyncThunk<
  findPwReturnType,
  findPwParamType,
  { state: RootState; rejectValue: findPweErrorType }
>('FIND_PW', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/auth/findPw', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editPw = createAsyncThunk<
  editPwReturnType,
  editPwParamType,
  { state: RootState; rejectValue: editPwErrorType }
>('EDIT_PW', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/auth/editPw', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
