import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import {
  getPostErrorType,
  getPostParamType,
  getPostReturnType,
  addPostErrorType,
  addPostParamType,
  addPostReturnType,
  addPostCommentErrorType,
  addPostCommentParamType,
  addPostCommentReturnType,
  imageUploadErrorType,
  imageUploadParamType,
  imageUploadReturnType,
  imageRemoveErrorType,
  imageRemoveParamType,
  imageRemoveReturnType,
} from '@src/store/types/post.type';

export const getPost = createAsyncThunk<
  getPostReturnType,
  getPostParamType,
  { state: RootState; rejectValue: getPostErrorType }
>('GET_POST', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/board/getPost', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addPost = createAsyncThunk<
  addPostReturnType,
  addPostParamType,
  { state: RootState; rejectValue: addPostErrorType }
>('ADD_POST', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/board/addPost', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addPostComment = createAsyncThunk<
  addPostCommentReturnType,
  addPostCommentParamType,
  { state: RootState; rejectValue: addPostCommentErrorType }
>('ADD_POST_COMMENT', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/board/addPostComment', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const imageUpload = createAsyncThunk<
  imageUploadReturnType,
  imageUploadParamType,
  { state: RootState; rejectValue: imageUploadErrorType }
>('IMAGE_UPLOAD', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/board/imageUpload', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const imageRemove = createAsyncThunk<
  imageRemoveReturnType,
  imageRemoveParamType,
  { state: RootState; rejectValue: imageRemoveErrorType }
>('IMAGE_REMOVE', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/board/imageRemove', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
