import React, { useEffect } from 'react';

interface type {
  openDropDown: boolean;
  setOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  targetRef: React.RefObject<HTMLUListElement>;
}

const useDropDown = ({ openDropDown, setOpenDropDown, targetRef }: type) => {
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (openDropDown && targetRef.current && !targetRef.current.contains(e.target)) {
        setOpenDropDown(false);
      }
    };
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [openDropDown, setOpenDropDown, targetRef]);
};

export default useDropDown;
