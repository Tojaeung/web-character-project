import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { ProfileType } from '../types/profile.type';
import { getProfile, follow, unFollow } from '../requests/profile.request';

interface profileType {
  ok: boolean | undefined;
  profile: ProfileType | undefined;
  message: string | undefined;
}

const initialState: profileType = {
  ok: undefined,
  profile: undefined,
  message: undefined,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.profile = payload.profile;
    });
    builder.addCase(getProfile.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.profile = undefined;
    });
    builder.addCase(follow.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      // 팔로워 사람 수를 늘려준다.
      state.profile!.followerNum++;
      // 팔로워가 되었다.
      state.profile!.follow = true;
    });
    builder.addCase(follow.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.profile = undefined;
    });
    builder.addCase(unFollow.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      // 팔로워 사람 수를 줄려준다.
      state.profile!.followerNum--;
      // 팔로우가 취소 되었다.
      state.profile!.follow = false;
    });
    builder.addCase(unFollow.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.profile = undefined;
    });
  },
});

// export const {  } = authSlice.actions;

export const selectProfileOk = (state: RootState) => state.profile.ok;
export const selectProfileProfile = (state: RootState) => state.profile.profile;
export const selectProfileMessage = (state: RootState) => state.profile.message;

export default profileSlice.reducer;
