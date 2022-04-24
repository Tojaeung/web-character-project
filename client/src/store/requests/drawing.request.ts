import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getDrawingsReturnType,
  getDrawingsDataType,
  getDrawingsErrorType,
  addCommentErrorType,
  addCommentDataType,
  addCommentReturnType,
  addDisLikeErrorType,
  addDisLikeDataType,
  addDisLikeReturnType,
  addLikeErrorType,
  addLikeDataType,
  addLikeReturnType,
  addViewReturnType,
  addViewDataType,
  addViewErrorType,
  removeCommentReturnType,
  removeCommentDataType,
  removeCommentErrorType,
  editCommentReturnType,
  editCommentDataType,
  editCommentErrorType,
  addDrawingReturnType,
  addDrawingDataType,
  addDrawingErrorType,
  removeDrawingErrorType,
  removeDrawingDataType,
  removeDrawingReturnType,
} from '@src/store/types/drawing.type';
import { RootState } from '../app/store';

export const getDrawings = createAsyncThunk<
  getDrawingsReturnType,
  getDrawingsDataType,
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

export const addDrawing = createAsyncThunk<
  addDrawingReturnType,
  addDrawingDataType,
  { state: RootState; rejectValue: addDrawingErrorType }
>('ADD_DRAWING', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/drawing/addDrawing', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const removeDrawing = createAsyncThunk<
  removeDrawingReturnType,
  removeDrawingDataType,
  { state: RootState; rejectValue: removeDrawingErrorType }
>('REMOVE_DRAWING', async (data, thunkApi) => {
  try {
    const res = await axios.delete(`/api/drawing/removeDrawing/${data.drawingId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const addDrawingView = createAsyncThunk<
  addViewReturnType,
  addViewDataType,
  { state: RootState; rejectValue: addViewErrorType }
>('ADD_DRAWING_VIEW', async (data, thunkApi) => {
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
  addCommentDataType,
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
  addLikeDataType,
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
  addDisLikeDataType,
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

export const removeDrawingComment = createAsyncThunk<
  removeCommentReturnType,
  removeCommentDataType,
  { state: RootState; rejectValue: removeCommentErrorType }
>('REMOVE_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const res = await axios.delete(`/api/drawing/removeComment/${data.drawingCommentId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const editDrawingComment = createAsyncThunk<
  editCommentReturnType,
  editCommentDataType,
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
