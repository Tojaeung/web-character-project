import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import {
  getBoardsErrorType,
  getBoardsReturnType,
  getBoardErrorType,
  getBoardParamType,
  getBoardReturnType,
} from '../types/board.type';

export const getBoards = createAsyncThunk<
  getBoardsReturnType,
  void,
  { state: RootState; rejectValue: getBoardsErrorType }
>('GET_BOARDS', async (_, thunkApi) => {
  try {
    const res = await axios.get('/api/board/getBoards', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const getBoard = createAsyncThunk<
  getBoardReturnType,
  getBoardParamType,
  { state: RootState; rejectValue: getBoardErrorType }
>('GET_BOARD', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/board/getBoard`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
