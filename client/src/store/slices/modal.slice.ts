import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface ModalType {
  isOpen: boolean;
  mode: string | undefined;
}

const initialState: ModalType = {
  isOpen: false,
  mode: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.mode = action.payload.mode;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.mode = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModalIsOpen = (state: RootState) => state.modal.isOpen;
export const selectModalMode = (state: RootState) => state.modal.mode;

export default modalSlice.reducer;
