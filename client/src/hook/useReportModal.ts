import { useState } from 'react';

const useReportModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openReportModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // 모달 뒤에 화면 고정
  };

  const closeReportModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset'; // 모달 뒤에 화면 고정 해제
  };

  return { isOpen, openReportModal, closeReportModal };
};

export default useReportModal;
