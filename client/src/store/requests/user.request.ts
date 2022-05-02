import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import {
  signUpReturnType,
  signUpDataType,
  forgotPwDataType,
  forgotPwReturnType,
  resetPwDataType,
  resetPwReturnType,
  getUserReturnType,
  getUserDataType,
  updateEmailReturnType,
  updateEmailDataType,
  updateNicknameReturnType,
  updateNicknameDataType,
  updatePwReturnType,
  updatePwDataType,
  updateDescReturnType,
  updateDescDataType,
  updateAvatarReturnType,
  updateAvatarDataType,
  updateDefaultAvatarReturnType,
  updateCoverReturnType,
  updateCoverDataType,
  updateDefaultCoverReturnType,
  deleteAccountReturnType,
} from '@src/store/types/user.type';

export const signUp = createAsyncThunk<
  signUpReturnType,
  signUpDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
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
  { state: RootState; rejectValue: { ok: boolean; message: string } }
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
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('RESET_PW', async (data, thunkApi) => {
  try {
    const { pwToken, updatedPw, updatedPwConfirmation } = data;
    const res = await axios.patch(
      `/api/users/reset-pw?pwToken=${pwToken}`,
      { updatedPw, updatedPwConfirmation },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const getUser = createAsyncThunk<
  getUserReturnType,
  getUserDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_USER', async (data, thunkApi) => {
  try {
    const { userId } = data;
    const res = await axios.get(`/api/users/${userId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updateEmail = createAsyncThunk<
  updateEmailReturnType,
  updateEmailDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_EMAIL', async (data, thunkApi) => {
  try {
    const res = await axios.patch(`/api/users/verify-email`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updateNickname = createAsyncThunk<
  updateNicknameReturnType,
  updateNicknameDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_NICKNAME', async (data, thunkApi) => {
  try {
    const res = await axios.patch(`/api/users/nickname`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updatePw = createAsyncThunk<
  updatePwReturnType,
  updatePwDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_PW', async (data, thunkApi) => {
  try {
    const res = await axios.patch(`/api/users/nickname`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updateDesc = createAsyncThunk<
  updateDescReturnType,
  updateDescDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_DESC', async (data, thunkApi) => {
  try {
    const res = await axios.patch(`/api/users/desc`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updateAvatar = createAsyncThunk<
  updateAvatarReturnType,
  updateAvatarDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_AVATAR', async (data, thunkApi) => {
  try {
    const res = await axios.patch(`/api/users/avatar`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updateDefaultAvatar = createAsyncThunk<
  updateDefaultAvatarReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_DEFAULT_AVATAR', async (_, thunkApi) => {
  try {
    const res = await axios.patch(`/api/users/default-avatar`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updateCover = createAsyncThunk<
  updateCoverReturnType,
  updateCoverDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_COVER', async (data, thunkApi) => {
  try {
    const res = await axios.patch(`/api/users/cover`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updateDefaultCover = createAsyncThunk<
  updateDefaultCoverReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_DEFAULT_COVER', async (_, thunkApi) => {
  try {
    const res = await axios.patch(`/api/users/default-cover`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const deleteAccount = createAsyncThunk<
  deleteAccountReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_ACCOUNT', async (_, thunkApi) => {
  try {
    const res = await axios.delete(`/api/users`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
