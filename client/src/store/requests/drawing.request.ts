import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getDrawingsReturnType,
  getDrawingsParamType,
  getDrawingsErrorType,
  addCommentErrorType,
  addCommentParamType,
  addCommentReturnType,
  addDisLikeErrorType,
  addDisLikeParamType,
  addDisLikeReturnType,
  addLikeErrorType,
  addLikeParamType,
  addLikeReturnType,
  removeDisLikeErrorType,
  removeDisLikeParamType,
  removeDisLikeReturnType,
  removeLikeErrorType,
  removeLikeParamType,
  removeLikeReturnType,
  addViewReturnType,
  addViewParamType,
  addViewErrorType,
  removeCommentReturnType,
  removeCommentParamType,
  removeCommentErrorType,
  editCommentReturnType,
  editCommentParamType,
  editCommentErrorType,
} from '@src/store/types/drawing.type';
import { RootState } from '../app/store';

export const getDrawings = createAsyncThunk<
  getDrawingsReturnType,
  getDrawingsParamType,
  { state: RootState; rejectValue: getDrawingsErrorType }
>('GET_DRAWINGS', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/drawing/getDrawings', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addView = createAsyncThunk<
  addViewReturnType,
  addViewParamType,
  { state: RootState; rejectValue: addViewErrorType }
>('ADD_VIEW', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/addView`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addDrawingComment = createAsyncThunk<
  addCommentReturnType,
  addCommentParamType,
  { state: RootState; rejectValue: addCommentErrorType }
>('ADD_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/addComment`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addDrawingLike = createAsyncThunk<
  addLikeReturnType,
  addLikeParamType,
  { state: RootState; rejectValue: addLikeErrorType }
>('ADD_DRAWING_LIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/addLike`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addDrawingDisLike = createAsyncThunk<
  addDisLikeReturnType,
  addDisLikeParamType,
  { state: RootState; rejectValue: addDisLikeErrorType }
>('ADD_DRAWING_DISLIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/addDisLike`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const removeDrawingLike = createAsyncThunk<
  removeLikeReturnType,
  removeLikeParamType,
  { state: RootState; rejectValue: removeLikeErrorType }
>('REMOVE_DRAWING_LIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/removeLike`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const removeDrawingDisLike = createAsyncThunk<
  removeDisLikeReturnType,
  removeDisLikeParamType,
  { state: RootState; rejectValue: removeDisLikeErrorType }
>('REMOVE_DRAWING_DISLIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/removeDisLike`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const removeDrawingComment = createAsyncThunk<
  removeCommentReturnType,
  removeCommentParamType,
  { state: RootState; rejectValue: removeCommentErrorType }
>('REMOVE_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/removeComment`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editDrawingComment = createAsyncThunk<
  editCommentReturnType,
  editCommentParamType,
  { state: RootState; rejectValue: editCommentErrorType }
>('EDIT_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const res = await axios.patch(`/api/drawing/editComment`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
