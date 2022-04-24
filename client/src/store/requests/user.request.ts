import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import {
  signUpReturnType,
  signUpErrorType,
  signUpDataType,
  forgotPwDataType,
  forgotPwReturnType,
  forgotPwErrorType,
  resetPwErrorType,
  resetPwDataType,
  resetPwReturnType,
} from '@src/store/types/user.type';

export const signUp = createAsyncThunk<
  signUpReturnType,
  signUpDataType,
  { state: RootState; rejectValue: signUpErrorType }
>('SIGN_UP', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/users', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const forgotPw = createAsyncThunk<
  forgotPwReturnType,
  forgotPwDataType,
  { state: RootState; rejectValue: forgotPwErrorType }
>('FORGOT_PW', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/users/forgot-pw', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const resetPw = createAsyncThunk<
  resetPwReturnType,
  resetPwDataType,
  { state: RootState; rejectValue: resetPwErrorType }
>('RESET_PW', async (data, thunkApi) => {
  try {
    const res = await axios.patch(
      `/api/users/reset-pw?pwToken=${data.pwToken}`,
      { pw: data.pw, pwConfirmation: data.pwConfirmation },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
