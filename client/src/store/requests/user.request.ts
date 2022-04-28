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
  getUserReturnType,
  getUserDataType,
  getUserErrorType,
  verifyEmailReturnType,
  verifyEmailDataType,
  verifyEmailErrorType,
  updateNicknameReturnType,
  updateNicknameDataType,
  updateNicknameErrorType,
  updatePwReturnType,
  updatePwDataType,
  updatePwErrorType,
  updateDescReturnType,
  updateDescDataType,
  updateDescErrorType,
  updateAvatarReturnType,
  updateAvatarDataType,
  updateAvatarErrorType,
  updateDefaultAvatarReturnType,
  updateDefaultAvatarErrorType,
  updateCoverReturnType,
  updateCoverDataType,
  updateCoverErrorType,
  updateDefaultCoverReturnType,
  updateDefaultCoverErrorType,
  deleteAccountReturnType,
  deleteAccountErrorType,
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
      { updatedPw: data.updatedPw, updatedPwConfirmation: data.updatedPwConfirmation },
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
  { state: RootState; rejectValue: getUserErrorType }
>('GET_USER', async (data, thunkApi) => {
  try {
    const res = await axios.get(`/api/users/${data.userId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const verifyEmail = createAsyncThunk<
  verifyEmailReturnType,
  verifyEmailDataType,
  { state: RootState; rejectValue: verifyEmailErrorType }
>('VERIFY_EMAIL', async (data, thunkApi) => {
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
  { state: RootState; rejectValue: updateNicknameErrorType }
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
  { state: RootState; rejectValue: updatePwErrorType }
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
  { state: RootState; rejectValue: updateDescErrorType }
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
  { state: RootState; rejectValue: updateAvatarErrorType }
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
  { state: RootState; rejectValue: updateDefaultAvatarErrorType }
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
  { state: RootState; rejectValue: updateCoverErrorType }
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
  { state: RootState; rejectValue: updateDefaultCoverErrorType }
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
  { state: RootState; rejectValue: deleteAccountErrorType }
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
