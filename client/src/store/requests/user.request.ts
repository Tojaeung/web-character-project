import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import instance from 'utils/axios.util';
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
  sendReportDataType,
  sendReportReturnType,
  getUserInfoDataType,
  getUserInfoReturnType,
  givePenaltyDataType,
  givePenaltyReturnType,
  deleteAccountReturnType,
} from 'store/types/user.type';

export const signUp = createAsyncThunk<
  signUpReturnType,
  signUpDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('SIGN_UP', async (data, thunkApi) => {
  try {
    const res = await instance.post('/users', data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const forgotPw = createAsyncThunk<
  forgotPwReturnType,
  forgotPwDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('FORGOT_PW', async (data, thunkApi) => {
  try {
    const res = await instance.post('/users/forgot-pw', data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const resetPw = createAsyncThunk<
  resetPwReturnType,
  resetPwDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('RESET_PW', async (data, thunkApi) => {
  try {
    const { pwToken, updatedPw, updatedPwConfirmation } = data;
    const res = await instance.patch(`/users/reset-pw?pwToken=${pwToken}`, { updatedPw, updatedPwConfirmation });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const getUser = createAsyncThunk<
  getUserReturnType,
  getUserDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_USER', async (data, thunkApi) => {
  try {
    const { userId } = data;
    const res = await instance.get(`/users/${userId}`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateEmail = createAsyncThunk<
  updateEmailReturnType,
  updateEmailDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_EMAIL', async (data, thunkApi) => {
  try {
    const res = await instance.patch(`/me/verify-email`, data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateNickname = createAsyncThunk<
  updateNicknameReturnType,
  updateNicknameDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_NICKNAME', async (data, thunkApi) => {
  try {
    const res = await instance.patch(`/me/nickname`, data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updatePw = createAsyncThunk<
  updatePwReturnType,
  updatePwDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_PW', async (data, thunkApi) => {
  try {
    const res = await instance.patch(`/me/pw`, data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateDesc = createAsyncThunk<
  updateDescReturnType,
  updateDescDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_DESC', async (data, thunkApi) => {
  try {
    const res = await instance.patch(`/me/desc`, data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateAvatar = createAsyncThunk<
  updateAvatarReturnType,
  updateAvatarDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_AVATAR', async (data, thunkApi) => {
  try {
    const res = await instance.patch(`/me/avatar`, data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateDefaultAvatar = createAsyncThunk<
  updateDefaultAvatarReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_DEFAULT_AVATAR', async (_, thunkApi) => {
  try {
    const res = await instance.patch(`/me/default-avatar`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateCover = createAsyncThunk<
  updateCoverReturnType,
  updateCoverDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_COVER', async (data, thunkApi) => {
  try {
    const res = await instance.patch(`/me/cover`, data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateDefaultCover = createAsyncThunk<
  updateDefaultCoverReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_DEFAULT_COVER', async (_, thunkApi) => {
  try {
    const res = await instance.patch(`/me/default-cover`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const sendReport = createAsyncThunk<
  sendReportReturnType,
  sendReportDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('SEND_REPORT', async (data, thunkApi) => {
  const { reportType, report, url, suspectId } = data;
  try {
    const res = await instance.post(`/users/${suspectId}/sendReport`, { reportType, report, url });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const getUserInfo = createAsyncThunk<
  getUserInfoReturnType,
  getUserInfoDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_USERINFO', async (data, thunkApi) => {
  const { userId } = data;
  try {
    const res = await instance.get(`/users/${userId}/info`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const givePenalty = createAsyncThunk<
  givePenaltyReturnType,
  givePenaltyDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GIVE_PENALTY', async (data, thunkApi) => {
  const { userId, penaltyPeriod } = data;
  try {
    const res = await instance.patch(`/users/${userId}/exp`, { penaltyPeriod });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const deleteAccount = createAsyncThunk<
  deleteAccountReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_ACCOUNT', async (_, thunkApi) => {
  try {
    const res = await instance.delete(`/me`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
