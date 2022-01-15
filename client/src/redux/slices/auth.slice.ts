import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { UserType } from '../types/user.type';
import { loginUser, logoutUser, refreshToken } from '../requests/auth.request';

interface AuthType {
  token: string | undefined;
  message: string | undefined;
  user: UserType | undefined;
}

const initialState: AuthType = {
  token: undefined,
  user: undefined,
  message: undefined,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.message = payload.message;
      state.user = payload.user;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.token = undefined;
      state.message = payload?.message;
      state.user = undefined;
    });

    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      state.token = undefined;
      state.message = payload.message;
      state.user = undefined;
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.token = undefined;
      state.message = payload?.message;
      state.user = undefined;
    });

    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.message = payload.message;
      state.user = payload.user;
    });
    builder.addCase(refreshToken.rejected, (state, { payload }) => {
      state.token = undefined;
      state.message = payload?.message;
      state.user = undefined;
    });
  },
});

// export const {  } = authSlice.actions;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthMessage = (state: RootState) => state.auth.message;
export const selectAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
