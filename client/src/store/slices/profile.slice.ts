import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { ProfileType } from '@src/types';
import { getProfile, follow, unFollow } from '../requests/profile.request';

interface profileType {
  ok: boolean;
  message: string | null;
  profile: ProfileType | null;
}

const initialState: profileType = {
  ok: false,
  message: null,
  profile: null,
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
      state.ok = payload!.ok;
      state.message = payload!.message;
      state.profile = null;
    });
    builder.addCase(follow.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      state.profile?.followers.push(payload.newFollower);
      alert(state.message);
    });
    builder.addCase(follow.rejected, (state, { payload }) => {
      state.ok = payload?.ok!;
      state.message = payload?.message!;
    });
    builder.addCase(unFollow.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      const filteredFollowers = state.profile?.followers.filter((follower) => follower.from_id !== payload.userId);

      state.profile!.followers = filteredFollowers!;

      alert(state.message);
    });
    builder.addCase(unFollow.rejected, (state, { payload }) => {
      state.ok = payload?.ok!;
      state.message = payload?.message!;
    });
  },
});

// export const {  } = authSlice.actions;

export const selectProfileOk = (state: RootState) => state.profile.ok;
export const selectProfileProfile = (state: RootState) => state.profile.profile;
export const selectProfileMessage = (state: RootState) => state.profile.message;

export default profileSlice.reducer;
