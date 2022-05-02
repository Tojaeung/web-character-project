import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { UserType } from '@src/types';
import { signIn, signOut, refreshLogin } from '@src/store/requests/session.request';
import {
  updateAvatar,
  updateCover,
  updateDefaultAvatar,
  updateDefaultCover,
  updateDesc,
  updateNickname,
} from '@src/store/requests/user.request';
import socket from '@src/utils/socket';

interface UserSliceType {
  ok: boolean;
  message: string | null;
  user: UserType | null;
}

const initialState: UserSliceType = {
  ok: false,
  message: null,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 로그인
    builder
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user = payload.user;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

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

    // 로그아웃
    builder
      .addCase(signOut.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user = null;
        socket.disconnect();
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
        socket.disconnect();
      });

    builder
      .addCase(updateNickname.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.nickname = payload.updatedNickname;
      })
      .addCase(updateNickname.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.avatar = payload.updatedAvatar;
        state.user!.avatarKey = payload.updatedAvatarKey;
      })

      .addCase(updateAvatar.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(updateDefaultAvatar.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.avatar = payload.updatedAvatar;
        state.user!.avatarKey = payload.updatedAvatarKey;
      })

      .addCase(updateDefaultAvatar.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(updateCover.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.cover = payload.updatedCover;
        state.user!.coverKey = payload.updatedCoverKey;
      })

      .addCase(updateCover.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(updateDefaultCover.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.cover = payload.updatedCover;
        state.user!.coverKey = payload.updatedCoverKey;
      })

      .addCase(updateDefaultCover.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });

    builder
      .addCase(updateDesc.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.desc = payload.updatedDesc;
      })

      .addCase(updateDesc.rejected, (state, { payload }) => {
        state.ok = payload?.ok!;
        state.message = payload?.message!;
        state.user = null;
      });
  },
});

// export const { } = authSlice.actions;
export const selectUserOk = (state: RootState) => state.user.ok;
export const selectUserMessage = (state: RootState) => state.user.message;
export const selectUserUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
