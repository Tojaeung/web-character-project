import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { UserType } from '@src/types';
import { signIn, signOut } from '@src/store/requests/session.request';
import {
  editNickname,
  editAvatar,
  editDefaultAvatar,
  editCover,
  editDefaultCover,
  editDesc,
} from '@src/store/requests/settings.request';
import { calcExp } from '@src/store/requests/etc.request';
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

    // 로그아웃
    builder
      .addCase(signOut.fulfilled, (state, { payload }) => {
        console.log(payload.ok);
        console.log(payload.message);

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
    builder
      .addCase(calcExp.fulfilled, (state, { payload }) => {
        state.ok = payload.ok;
        state.message = payload.message;
        state.user!.exp += payload.calcedValue;
      })

      .addCase(calcExp.rejected, (state, { payload }) => {
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
