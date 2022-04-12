import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  sendReportParamType,
  sendReportErrorType,
  sendReportReturnType,
  getUserInfoErrorType,
  getUserInfoParamType,
  getUserInfoReturnType,
} from '@src/store/types/etc.type';
import { RootState } from '../app/store';

export const sendReport = createAsyncThunk<
  sendReportReturnType,
  sendReportParamType,
  { state: RootState; rejectValue: sendReportErrorType }
>('SEND_REPORT', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/etc/sendReport', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const getUserInfo = createAsyncThunk<
  getUserInfoReturnType,
  getUserInfoParamType,
  { state: RootState; rejectValue: getUserInfoErrorType }
>('GET_USER_INFO', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/etc/getUserInfo', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});