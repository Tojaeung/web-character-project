import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from 'utils/axios.util';
import { RootState } from '../app/store';
import {
  getDrawingsReturnType,
  getDrawingsDataType,
  createDrawingReturnType,
  createDrawingDataType,
  incrementViewReturnType,
  incrementViewDataType,
  deleteDrawingReturnType,
  deleteDrawingDataType,
  createCommentReturnType,
  createCommentDataType,
  updateCommentReturnType,
  updateCommentDataType,
  deleteCommentReturnType,
  deleteCommentDataType,
  createLikeReturnType,
  createLikeDataType,
  createDisLikeReturnType,
  createDisLikeDataType,
} from 'store/types/drawing.type';

export const getDrawings = createAsyncThunk<
  getDrawingsReturnType,
  getDrawingsDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_DRAWINGS', async (data, thunkApi) => {
  const { userId, cursor } = data;
  try {
    const res = await instance.get(`/drawings/users/${userId}?cursor=${cursor}`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const incrementView = createAsyncThunk<
  incrementViewReturnType,
  incrementViewDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('INCREMENT_VIEW', async (data, thunkApi) => {
  try {
    const { drawingId } = data;
    const res = await instance.patch(`/drawings/${drawingId}/view`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const createDrawing = createAsyncThunk<
  createDrawingReturnType,
  createDrawingDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_DRAWING', async (data, thunkApi) => {
  try {
    const res = await instance.post('/drawings', data);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const deleteDrawing = createAsyncThunk<
  deleteDrawingReturnType,
  deleteDrawingDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_DRAWING', async (data, thunkApi) => {
  try {
    const { drawingId } = data;
    const res = await instance.delete(`/drawings/${drawingId}`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const createDrawingComment = createAsyncThunk<
  createCommentReturnType,
  createCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const { content, drawingId } = data;
    const res = await instance.post(`/drawings/${drawingId}/comments`, { content });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updateDrawingComment = createAsyncThunk<
  updateCommentReturnType,
  updateCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const { commentId, updatedContent } = data;
    const res = await instance.patch(`/drawings/comments/${commentId}`, { updatedContent });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const deleteDrawingComment = createAsyncThunk<
  deleteCommentReturnType,
  deleteCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const { commentId } = data;
    const res = await instance.delete(`/drawings/comments/${commentId}`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const createDrawingLike = createAsyncThunk<
  createLikeReturnType,
  createLikeDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_DRAWING_LIKE', async (data, thunkApi) => {
  try {
    const { userId, drawingId } = data;
    const res = await instance.post(`/drawings/${drawingId}/like`, { userId });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const createDrawingDisLike = createAsyncThunk<
  createDisLikeReturnType,
  createDisLikeDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_DRAWING_DISLIKE', async (data, thunkApi) => {
  try {
    const { userId, drawingId } = data;
    const res = await instance.post(`/drawings/${drawingId}/dislike`, { userId });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
