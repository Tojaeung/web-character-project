import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '@src/utils/axios.util';
import { RootState } from '../app/store';
import {
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
} from '../types/post.type';

export const getPost = createAsyncThunk<
  getPostReturnType,
  getPostDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('GET_POST', async (data, thunkApi) => {
  try {
    const { postId } = data;
    const res = await instance.get(`/posts/${postId}`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const createPost = createAsyncThunk<
  createPostReturnType,
  createPostDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_POST', async (data, thunkApi) => {
  try {
    const { board, content, imageKeys, title } = data;
    const res = await instance.post(`/boards/${board}/posts`, { title, content, imageKeys });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updatePost = createAsyncThunk<
  updatePostReturnType,
  updatePostDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_POST', async (data, thunkApi) => {
  try {
    const { postId, title, content, imageKeys } = data;
    const res = await instance.patch(`/posts/${postId}`, { title, content, imageKeys });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const deletePost = createAsyncThunk<
  deletePostReturnType,
  deletePostDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_POST', async (data, thunkApi) => {
  try {
    const { postId } = data;
    const res = await instance.delete(`/posts/${postId}`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const createPostComment = createAsyncThunk<
  createCommentReturnType,
  createCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_POST_COMMENT', async (data, thunkApi) => {
  try {
    const { board, postId, content } = data;
    const res = await instance.post(`/boards/${board}/posts/${postId}/comments`, { content });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const updatePostComment = createAsyncThunk<
  updateCommentReturnType,
  updateCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('UPDATE_POST_COMMENT', async (data, thunkApi) => {
  try {
    const { commentId, updatedContent } = data;
    const res = await instance.patch(`/posts/comments/${commentId}`, { updatedContent });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const deletePostComment = createAsyncThunk<
  deleteCommentReturnType,
  deleteCommentDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('DELETE_POST_COMMENT', async (data, thunkApi) => {
  try {
    const { commentId } = data;
    const res = await instance.delete(`/posts/comments/${commentId}`);
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const createPostLike = createAsyncThunk<
  createLikeReturnType,
  createLikeDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_POST_LIKE', async (data, thunkApi) => {
  try {
    const { postId, userId } = data;
    const res = await instance.post(`/posts/${postId}/like`, { userId });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const createPostDisLike = createAsyncThunk<
  createDisLikeReturnType,
  createDisLikeDataType,
  { state: RootState; rejectValue: { ok: boolean; message: string } }
>('CREATE_POST_DISLIKE', async (data, thunkApi) => {
  try {
    const { postId, userId } = data;
    const res = await instance.post(`/posts/${postId}/dislike`, { userId });
    return res.data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});
