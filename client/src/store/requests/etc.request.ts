import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  sendReportDataType,
  sendReportErrorType,
  sendReportReturnType,
  getUserInfoErrorType,
  getUserInfoDataType,
  getUserInfoReturnType,
  penaltyByAdminReturnType,
  penaltyByAdminDataType,
  penaltyByAdminErrorType,
} from '@src/store/types/etc.type';
import { RootState } from '../app/store';

export const sendReport = createAsyncThunk<
  sendReportReturnType,
  sendReportDataType,
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
  getUserInfoDataType,
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

export const penaltyByAdmin = createAsyncThunk<
  penaltyByAdminReturnType,
  penaltyByAdminDataType,
  { state: RootState; rejectValue: penaltyByAdminErrorType }
>('PENELTY_BY_ADMIN', async (data, thunkApi) => {
  try {
    const res = await axios.patch(`/api/etc/penaltyByAdmin`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
