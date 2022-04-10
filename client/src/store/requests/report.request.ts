import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sendReportParamType, sendReportErrorType, sendReportReturnType } from '@src/store/types/report.type';
import { RootState } from '../app/store';

export const sendReport = createAsyncThunk<
  sendReportReturnType,
  sendReportParamType,
  { state: RootState; rejectValue: sendReportErrorType }
>('SEND_REPORT', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/report/send', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
