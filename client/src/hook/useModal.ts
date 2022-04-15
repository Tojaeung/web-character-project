import { useState } from 'react';

export const useReportModal = () => {
  const [showReportModal, setShowReportModal] = useState(false);

  const openReportModal = () => {
    setShowReportModal(true);
    document.body.style.overflow = 'hidden'; // 모달 뒤에 화면 고정
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    document.body.style.overflow = 'unset'; // 모달 뒤에 화면 고정 해제
  };

  return { showReportModal, openReportModal, closeReportModal };
};

export const useUserInfoModal = () => {
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);

  const openUserInfoModal = () => {
    setShowUserInfoModal(true);
    document.body.style.overflow = 'hidden'; // 모달 뒤에 화면 고정
  };

  const closeUserInfoModal = () => {
    setShowUserInfoModal(false);
    document.body.style.overflow = 'unset'; // 모달 뒤에 화면 고정 해제
  };

  return { showUserInfoModal, openUserInfoModal, closeUserInfoModal };
};

export const useDescModal = () => {
  const [showDescModal, setShowDescModal] = useState(false);

  const openDescModal = () => {
    setShowDescModal(true);
    document.body.style.overflow = 'hidden'; // 모달 뒤에 화면 고정
  };

  const closeDescModal = () => {
    setShowDescModal(false);
    document.body.style.overflow = 'unset'; // 모달 뒤에 화면 고정 해제
  };

  return { showDescModal, openDescModal, closeDescModal };
};

export const useDrawingModal = () => {
  const [showDrawingModal, setShowDrawingModal] = useState(false);

  const openDrawingModal = () => {
    setShowDrawingModal(true);
    document.body.style.overflow = 'hidden'; // 모달 뒤에 화면 고정
  };

  const closeDrawingModal = () => {
    setShowDrawingModal(false);
    document.body.style.overflow = 'unset'; // 모달 뒤에 화면 고정 해제
  };

  return { showDrawingModal, openDrawingModal, closeDrawingModal };
};
