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
      // 새로고침 대신에 리덕스 값을 임의로 변경해줘서 업데이트 시켜준다.
      state.profile!.followerNum++;
      state.profile!.isFollowing = true;
    });
    builder.addCase(follow.rejected, (state, { payload }) => {
      state.ok = payload?.ok;
      state.message = payload?.message;
      state.profile = undefined;
    });
    builder.addCase(unFollow.fulfilled, (state, { payload }) => {
      state.ok = payload.ok;
      state.message = payload.message;
      // 새로고침 대신에 리덕스 값을 임의로 변경해줘서 업데이트 시켜준다.
      state.profile!.followerNum--;
      state.profile!.isFollowing = false;
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
