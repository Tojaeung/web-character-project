import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { UserType } from '../types/user.type';
import { loginUser, logoutUser, refreshLogin } from '../requests/auth.request';

interface AuthType {
  ok: boolean | undefined;
  message: string | undefined;
  user: UserType | undefined;
}

const initialState: AuthType = {
  ok: undefined,
  user: undefined,
  message: undefined,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.user = payload.user;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.user = undefined;
    });

    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.user = undefined;
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.user = undefined;
    });

    builder.addCase(refreshLogin.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.user = payload.user;
    });
    builder.addCase(refreshLogin.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.user = undefined;
    });
  },
});

// export const {  } = authSlice.actions;
export const selectAuthOk = (state: RootState) => state.auth.ok;
export const selectAuthMessage = (state: RootState) => state.auth.message;
export const selectAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
