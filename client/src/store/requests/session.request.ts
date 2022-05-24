import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import instance from 'utils/axios.util';
import { signInDataType, signInReturnType, refreshLoginReturnType, signOutReturnType } from 'store/types/session.type';

export const signIn = createAsyncThunk<
  signInReturnType,
  signInDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('SIGN_IN', async (data, thunkApi) => {
  try {
    const res = await instance.post('/sessions', data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const refreshLogin = createAsyncThunk<
  refreshLoginReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('REFRESH_LOGIN', async (_, thunkApi) => {
  try {
    const res = await instance.get('/sessions');
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const signOut = createAsyncThunk<
  signOutReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('SIGN_OUT', async (_, thunkApi) => {
  try {
    const res = await instance.delete('/sessions', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
