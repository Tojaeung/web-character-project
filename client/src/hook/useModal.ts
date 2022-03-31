import { useState } from 'react';

const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const modalToggle = () => {
    setOpenModal(!openModal);
  };

  return { openModal, modalToggle };
};

export default useModal;
