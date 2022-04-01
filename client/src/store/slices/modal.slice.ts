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
      document.body.style.overflow = 'hidden'; // 모달 뒤에 화면 고정
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.mode = undefined;
      document.body.style.overflow = 'unset'; // 모달 뒤에 화면 고정 해제
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModalIsOpen = (state: RootState) => state.modal.isOpen;
export const selectModalMode = (state: RootState) => state.modal.mode;

export default modalSlice.reducer;
