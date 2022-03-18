import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getDrawingsReturnType,
  getDrawingsParamType,
  getDrawingsErrorType,
  getDrawingErrorType,
  getDrawingParamType,
  getDrawingReturnType,
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
} from '@src/redux/types/drawing.type';
import { RootState } from '../app/store';

export const getDrawings = createAsyncThunk<
  getDrawingsReturnType,
  getDrawingsParamType,
  { state: RootState; rejectValue: getDrawingsErrorType }
>('GET_DRAWINGS', async (data, thunkApi) => {
  try {
    const res = await axios.post(
      `/api/drawing/getDrawings?cursor=${data.cursor}`,
      { profileId: data.profileId },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const getDrawing = createAsyncThunk<
  getDrawingReturnType,
  getDrawingParamType,
  { state: RootState; rejectValue: getDrawingErrorType }
>('GET_DRAWING', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/getDrawing`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addComment = createAsyncThunk<
  addCommentReturnType,
  addCommentParamType,
  { state: RootState; rejectValue: addCommentErrorType }
>('ADD_COMMENT', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/addComment`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addLike = createAsyncThunk<
  addLikeReturnType,
  addLikeParamType,
  { state: RootState; rejectValue: addLikeErrorType }
>('ADD_LIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/addLike`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addDisLike = createAsyncThunk<
  addDisLikeReturnType,
  addDisLikeParamType,
  { state: RootState; rejectValue: addDisLikeErrorType }
>('ADD_DISLIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/addDisLike`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const removeLike = createAsyncThunk<
  removeLikeReturnType,
  removeLikeParamType,
  { state: RootState; rejectValue: removeLikeErrorType }
>('REMOVE_LIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/removeLike`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const removeDisLike = createAsyncThunk<
  removeDisLikeReturnType,
  removeDisLikeParamType,
  { state: RootState; rejectValue: removeDisLikeErrorType }
>('REMOVE_DISLIKE', async (data, thunkApi) => {
  try {
    const res = await axios.post(`/api/drawing/removeDisLike`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
