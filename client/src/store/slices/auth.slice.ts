import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { UserType } from '@src/types';
import { loginUser, logoutUser, refreshLogin } from '../requests/auth.request';
import {
  editNickname,
  editAvatar,
  editDefaultAvatar,
  editCover,
  editDefaultCover,
  editDesc,
} from '@src/store/requests/settings.request';

interface AuthType {
  ok: boolean;
  message: string | null;
  user: UserType | null;
}

const initialState: AuthType = {
  ok: false,
  message: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 로그인
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user = payload.user;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    // 로그아웃
    builder
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user = null;
        localStorage.removeItem('login');
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
        localStorage.removeItem('login');
      });

    // 새로고침 로그인 유저정보 다시 가져오기
    builder
      .addCase(refreshLogin.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user = payload.user;
      })
      .addCase(refreshLogin.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(editNickname.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.nickname = payload.newNickname;
      })
      .addCase(editNickname.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(editAvatar.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.avatar = payload.newAvatar;
        state.user!.avatarKey = payload.newAvatarKey;
      })

      .addCase(editAvatar.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(editDefaultAvatar.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.avatar = payload.defaultAvatar;
        state.user!.avatarKey = payload.defaultAvatarKey;
      })

      .addCase(editDefaultAvatar.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(editCover.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.cover = payload.newCover;
        state.user!.coverKey = payload.newCoverKey;
      })

      .addCase(editCover.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(editDefaultCover.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.cover = payload.defaultCover;
        state.user!.coverKey = payload.defaultCoverKey;
      })

      .addCase(editDefaultCover.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(editDesc.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.desc = payload.desc;
      })

      .addCase(editDesc.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });
  },
});

// export const { } = authSlice.actions;
export const selectAuthOk = (state: RootState) => state.auth.ok;
export const selectAuthMessage = (state: RootState) => state.auth.message;
export const selectAuthUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
