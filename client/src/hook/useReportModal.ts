import { useState } from 'react';

const useReportModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openReportModal = () => {
    setIsOpen(true);
  };

  const closeReportModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openReportModal, closeReportModal };
};

export default useReportModal;
