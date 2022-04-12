import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHook = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // 모달 뒤에 화면 고정
  };

  const closeModalHook = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset'; // 모달 뒤에 화면 고정 해제
  };

  return { isOpen, openModalHook, closeModalHook };
};

export default useModal;
