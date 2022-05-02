import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
} from '@src/store/types/drawing.type';
import { RootState } from '../app/store';

export const getDrawings = createAsyncThunk<
  getDrawingsReturnType,
  getDrawingsDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_DRAWINGS', async (data, thunkApi) => {
  const { userId, cursor } = data;
  try {
    const res = await axios.get(
      `/api/drawings/users/${userId}?cursor=${cursor}`,

      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const incrementView = createAsyncThunk<
  incrementViewReturnType,
  incrementViewDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('INCREMENT_VIEW', async (data, thunkApi) => {
  try {
    const { drawingId } = data;
    const res = await axios.patch(`/api/drawings/${drawingId}/view`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const createDrawing = createAsyncThunk<
  createDrawingReturnType,
  createDrawingDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_DRAWING', async (data, thunkApi) => {
  try {
    const res = await axios.post('/api/drawings', data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const deleteDrawing = createAsyncThunk<
  deleteDrawingReturnType,
  deleteDrawingDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_DRAWING', async (data, thunkApi) => {
  try {
    const { drawingId } = data;
    const res = await axios.delete(`/api/drawings/${drawingId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const createDrawingComment = createAsyncThunk<
  createCommentReturnType,
  createCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const { content, drawingId } = data;
    const res = await axios.post(
      `/api/drawings/${drawingId}`,
      { content },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updateDrawingComment = createAsyncThunk<
  updateCommentReturnType,
  updateCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const { commentId, updatedContent } = data;
    const res = await axios.patch(
      `/api/drawings/comments/${commentId}`,
      { updatedContent },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const deleteDrawingComment = createAsyncThunk<
  deleteCommentReturnType,
  deleteCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_DRAWING_COMMENT', async (data, thunkApi) => {
  try {
    const { commentId } = data;
    const res = await axios.delete(`/api/drawings/comments/${commentId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const createDrawingLike = createAsyncThunk<
  createLikeReturnType,
  createLikeDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_DRAWING_LIKE', async (data, thunkApi) => {
  try {
    const { userId, drawingId } = data;
    const res = await axios.post(
      `/api/drawings/${drawingId}/like`,
      { userId },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const createDrawingDisLike = createAsyncThunk<
  createDisLikeReturnType,
  createDisLikeDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_DRAWING_DISLIKE', async (data, thunkApi) => {
  try {
    const { userId, drawingId } = data;
    const res = await axios.post(
      `/api/drawings/${drawingId}/dislike`,
      { userId },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});
