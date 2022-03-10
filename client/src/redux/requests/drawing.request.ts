import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getDrawingReturnType, getDrawingParamType, getDrawingErrorType } from '@src/redux/types/drawing.type';
import { RootState } from '../app/store';

export const getDrawing = createAsyncThunk<
  getDrawingReturnType,
  getDrawingParamType,
  { state: RootState; rejectValue: getDrawingErrorType }
>('GET_DRAWING', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/profile/getDrawings?cursor=${data.cursor}`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
