import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  editEmailErrorType,
  editEmailParamType,
  editEmailReturnType,
  editNicknameErrorType,
  editNicknameParamType,
  editNicknameReturnType,
  editPwErrorType,
  editPwParamType,
  editPwReturnType,
  editAvatarErrorType,
  editAvatarParamType,
  editAvatarReturnType,
  defaultAvatarErrorType,
  defaultAvatarReturnType,
  editCoverErrorType,
  editCoverParamType,
  editCoverReturnType,
  defaultCoverErrorType,
  defaultCoverReturnType,
  editDescErrorType,
  editDescParamType,
  editDescReturnType,
  delAccountErrorType,
  delAccountReturnType,
} from '@src/store/types/settings.type';
import { RootState } from '../app/store';

export const editEmail = createAsyncThunk<
  editEmailReturnType,
  editEmailParamType,
  { state: RootState; rejectValue: editEmailErrorType }
>('EDIT_EMAIL', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/settings/account/editEmail', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editNickname = createAsyncThunk<
  editNicknameReturnType,
  editNicknameParamType,
  { state: RootState; rejectValue: editNicknameErrorType }
>('EDIT_NICKNAME', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/settings/account/editNickname', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editPw = createAsyncThunk<
  editPwReturnType,
  editPwParamType,
  { state: RootState; rejectValue: editPwErrorType }
>('EDIT_PW', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/settings/account/editNickname', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editAvatar = createAsyncThunk<
  editAvatarReturnType,
  editAvatarParamType,
  { state: RootState; rejectValue: editAvatarErrorType }
>('EDIT_AVATAR', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/settings/account/editAvatar', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editDefaultAvatar = createAsyncThunk<
  defaultAvatarReturnType,
  void,
  { state: RootState; rejectValue: defaultAvatarErrorType }
>('EDIT_DEFAULT_AVATAR', async (_, thunkApi) => {
  try {
    const res = await axios.post('/api/settings/account/defaultAvatar', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editCover = createAsyncThunk<
  editCoverReturnType,
  editCoverParamType,
  { state: RootState; rejectValue: editCoverErrorType }
>('EDIT_COVER', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/settings/account/editCover', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editDefaultCover = createAsyncThunk<
  defaultCoverReturnType,
  void,
  { state: RootState; rejectValue: defaultCoverErrorType }
>('EDIT_DEFAULT_COVER', async (_, thunkApi) => {
  try {
    const res = await axios.post('/api/settings/account/defaultCover', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editDesc = createAsyncThunk<
  editDescReturnType,
  editDescParamType,
  { state: RootState; rejectValue: editDescErrorType }
>('EDIT_DESC', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/settings/editDesc', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const delAccount = createAsyncThunk<
  delAccountReturnType,
  void,
  { state: RootState; rejectValue: delAccountErrorType }
>('DEL_ACCOUNT', async (_, thunkApi) => {
  try {
    const res = await axios.delete('/api/settings/account/delAccount', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
