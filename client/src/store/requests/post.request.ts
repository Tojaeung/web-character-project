import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import {
  getPostErrorType,
  getPostDataType,
  getPostReturnType,
  addPostErrorType,
  addPostDataType,
  addPostReturnType,
  addPostCommentErrorType,
  addPostCommentDataType,
  addPostCommentReturnType,
  imageUploadErrorType,
  imageUploadDataType,
  imageUploadReturnType,
  imageRemoveErrorType,
  imageRemoveDataType,
  imageRemoveReturnType,
  removePostErrorType,
  removePostDataType,
  removePostReturnType,
  editPostErrorType,
  editPostDataType,
  editPostReturnType,
  addPostLikeReturnType,
  addPostLikeDataType,
  addPostLikeErrorType,
  addPostDisLikeReturnType,
  addPostDisLikeDataType,
  addPostDisLikeErrorType,
  editPostCommentErrorType,
  editPostCommentDataType,
  editPostCommentReturnType,
  removePostCommentErrorType,
  removePostCommentDataType,
  removePostCommentReturnType,
  addViewErrorType,
  addViewDataType,
  addViewReturnType,
} from '@src/store/types/post.type';

export const addView = createAsyncThunk<
  addViewReturnType,
  addViewDataType,
  { state: RootState; rejectValue: addViewErrorType }
>('ADD_VIEW', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/post/addView', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const getPost = createAsyncThunk<
  getPostReturnType,
  getPostDataType,
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
  addPostDataType,
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

export const editPost = createAsyncThunk<
  editPostReturnType,
  editPostDataType,
  { state: RootState; rejectValue: editPostErrorType }
>('EDIT_POST', async (data, thunkApi) => {
  try {
    const res = await axios.patch('/api/post/editPost', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const removePost = createAsyncThunk<
  removePostReturnType,
  removePostDataType,
  { state: RootState; rejectValue: removePostErrorType }
>('REMOVE_POST', async (data, thunkApi) => {
  try {
    const res = await axios.delete(`/api/post/removePost/${data.postId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const imageUpload = createAsyncThunk<
  imageUploadReturnType,
  imageUploadDataType,
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
  imageRemoveDataType,
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
  addPostCommentDataType,
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
  removePostCommentReturnType,
  removePostCommentDataType,
  { state: RootState; rejectValue: removePostCommentErrorType }
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

export const addPostLike = createAsyncThunk<
  addPostLikeReturnType,
  addPostLikeDataType,
  { state: RootState; rejectValue: addPostLikeErrorType }
>('ADD_POST_LIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/post/addLike', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addPostDisLike = createAsyncThunk<
  addPostDisLikeReturnType,
  addPostDisLikeDataType,
  { state: RootState; rejectValue: addPostDisLikeErrorType }
>('ADD_POST_DISLIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/post/addDisLike`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editPostComment = createAsyncThunk<
  editPostCommentReturnType,
  editPostCommentDataType,
  { state: RootState; rejectValue: editPostCommentErrorType }
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
