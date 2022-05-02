import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../app/store';
import {
  getAllBoardsReturnType,
  getBoardDataType,
  getBoardReturnType,
  getPostReturnType,
  getPostDataType,
  createPostReturnType,
  createPostDataType,
  updatePostReturnType,
  updatePostDataType,
  deletePostReturnType,
  deletePostDataType,
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
} from '../types/board.type';

export const getAllBoards = createAsyncThunk<
  getAllBoardsReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_BOARDS', async (_, thunkApi) => {
  try {
    const res = await axios.get('/api/boards', {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const getBoard = createAsyncThunk<
  getBoardReturnType,
  getBoardDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_BOARD', async (data, thunkApi) => {
  try {
    const { board, queryString } = data;
    const res = await axios.get(`/api/boards/${board}${queryString}`, {
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
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_POST', async (data, thunkApi) => {
  try {
    const { board, postId } = data;
    const res = await axios.get(`/api/boards/${board}/posts/${postId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const createPost = createAsyncThunk<
  createPostReturnType,
  createPostDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_POST', async (data, thunkApi) => {
  try {
    const { board, content, imageKeys, title } = data;
    const res = await axios.post(
      `/api/boards/${board}/posts`,
      { title, content, imageKeys },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const updatePost = createAsyncThunk<
  updatePostReturnType,
  updatePostDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_POST', async (data, thunkApi) => {
  try {
    const { board, postId, title, content, imageKeys } = data;
    const res = await axios.patch(
      `/api/board/${board}/posts/${postId}`,
      { title, content, imageKeys },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const deletePost = createAsyncThunk<
  deletePostReturnType,
  deletePostDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_POST', async (data, thunkApi) => {
  try {
    const { board, postId } = data;
    const res = await axios.delete(`/api/boards/${board}/posts/${postId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const createPostComment = createAsyncThunk<
  createCommentReturnType,
  createCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_POST_COMMENT', async (data, thunkApi) => {
  try {
    const { board, postId, content } = data;
    const res = await axios.post(
      `/api/boards/${board}/posts/${postId}/comments`,
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

export const updatePostComment = createAsyncThunk<
  updateCommentReturnType,
  updateCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_POST_COMMENT', async (data, thunkApi) => {
  try {
    const { board, commentId, updatedContent } = data;
    const res = await axios.patch(
      `/api/boards/${board}/comments/${commentId}`,
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

export const deletePostComment = createAsyncThunk<
  deleteCommentReturnType,
  deleteCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_POST_COMMENT', async (data, thunkApi) => {
  try {
    const { board, commentId } = data;
    const res = await axios.delete(`/api/boards/${board}/comments/${commentId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue({ ok: err.response.data.ok, message: err.response.data.message });
  }
});

export const createPostLike = createAsyncThunk<
  createLikeReturnType,
  createLikeDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_POST_LIKE', async (data, thunkApi) => {
  try {
    const { postId, board, userId } = data;
    const res = await axios.post(
      `/api/boards/${board}/posts/${postId}`,
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

export const createPostDisLike = createAsyncThunk<
  createDisLikeReturnType,
  createDisLikeDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_POST_DISLIKE', async (data, thunkApi) => {
  try {
    const { postId, board, userId } = data;
    const res = await axios.post(
      `/api/boards/${board}/posts/${postId}`,
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
