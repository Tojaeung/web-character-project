import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '@src/utils/axios.util';
import { RootState } from '../app/store';
import {
  getAllBoardsReturnType,
  getBoardDataType,
  getBoardReturnType,
  getAllMyPostsReturnType,
  getAllMyCommentsReturnType,
} from '../types/board.type';

export const getAllBoards = createAsyncThunk<
  getAllBoardsReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_BOARDS', async (_, thunkApi) => {
  try {
    const res = await instance.get('/boards');
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const getBoard = createAsyncThunk<
  getBoardReturnType,
  getBoardDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_BOARD', async (data, thunkApi) => {
  try {
    const { board, queryString } = data;
    const res = await instance.get(`/boards/${board}${queryString}`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const getAllMyPosts = createAsyncThunk<
  getAllMyPostsReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_ALL_MY_POSTS', async (_, thunkApi) => {
  try {
    const res = await instance.get(`/me/posts`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const getAllMyComments = createAsyncThunk<
  getAllMyCommentsReturnType,
  void,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_ALL_MY_COMMENTS', async (_, thunkApi) => {
  try {
    const res = await instance.get(`/me/comments`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
