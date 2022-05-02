import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

interface ModalType {
  isOpen: boolean;
  modal: string | null;
  props: any | null;
}

const initialState: ModalType = {
  isOpen: false,
  modal: null,
  props: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modal = action.payload.modal;
      state.props = action.payload.props;
      document.body.style.overflow = 'hidden'; // 모달 뒤에 화면 고정
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modal = null;
      state.props = null;
      document.body.style.overflow = 'unset'; // 모달 뒤에 화면 고정 해제
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModalIsOpen = (state: RootState) => state.modal.isOpen;
export const selectModalModal = (state: RootState) => state.modal.modal;
export const selectModalProps = (state: RootState) => state.modal.props;

export default modalSlice.reducer;
