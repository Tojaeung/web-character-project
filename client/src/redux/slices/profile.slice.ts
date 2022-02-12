import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { UserType } from '../types/user.type';
import { getUser } from '../requests/profile.request';

interface profileType {
  ok: boolean | undefined;
  user: UserType | undefined;
  message: string | undefined;
}

const initialState: profileType = {
  ok: undefined,
  user: undefined,
  message: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.user = payload.user;
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.user = undefined;
    });
  },
});

// export const {  } = authSlice.actions;
export const selectProfileMessage = (state: RootState) => state.profile.message;
export const selectProfileUser = (state: RootState) => state.profile.user;

export default profileSlice.reducer;
