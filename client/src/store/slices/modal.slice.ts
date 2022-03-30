import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface ModalType {
  ok: boolean;
  mode: string | undefined;
}

const initialState: ModalType = {
  ok: false,
  mode: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.ok = true;
      state.mode = action.payload.mode;
    },
    closeModal: (state) => {
      state.ok = false;
      state.mode = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModalOk = (state: RootState) => state.modal.ok;
export const selectModalMode = (state: RootState) => state.modal.mode;

export default modalSlice.reducer;
