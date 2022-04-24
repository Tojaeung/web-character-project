import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import {
  signInErrorType,
  signInDataType,
  signInReturnType,
  signOutErrorType,
  signOutReturnType,
} from '@src/store/types/session.type';

export const signIn = createAsyncThunk<
  signInReturnType,
  signInDataType,
  { state: RootState; rejectValue: signInErrorType }
>('SIGN_IN', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/sessions', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const signOut = createAsyncThunk<signOutReturnType, void, { state: RootState; rejectValue: signOutErrorType }>(
  'SIGN_OUT',
  async (_, thunkApi) => {
    try {
      const res = await axios.delete('/api/sessions', {
        withCredentials: true,
      });
      return res.data;
    } catch (err: any) {
      return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
    }
  }
);
