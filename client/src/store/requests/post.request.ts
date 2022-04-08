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
  removePostErrorType,
  removePostParamType,
  removePostReturnType,
  editPostErrorType,
  editPostParamType,
  editPostReturnType,
} from '@src/store/types/post.type';

export const getPost = createAsyncThunk<
  getPostReturnType,
  getPostParamType,
  { state: RootState; rejectValue: getPostErrorType }
>('GET_POST', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/post/getPost', data, {
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
    const res = await axios.post('/api/post/addPost', data, {
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
    const res = await axios.post('/api/post/imageUpload', data, {
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
    const res = await axios.post('/api/post/imageRemove', data, {
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
    const res = await axios.post('/api/post/addComment', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const removePostComment = createAsyncThunk<
  removePostReturnType,
  removePostParamType,
  { state: RootState; rejectValue: removePostErrorType }
>('REMOVE_POST_COMMENT', async (data, thunkApi) => {
  try {
    const res = await axios.delete(`/api/post/removeComment/${data.postCommentId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editPostComment = createAsyncThunk<
  editPostReturnType,
  editPostParamType,
  { state: RootState; rejectValue: editPostErrorType }
>('EDIT_POST_COMMENT', async (data, thunkApi) => {
  try {
    const res = await axios.patch(`/api/post/editComment`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
