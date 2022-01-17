import React, { useState, useRef, useEffect } from 'react';
import { BsBell } from 'react-icons/bs';

import { Container } from '@src/components/header/Alert.styled';

function Alert() {
  const [openAlert, setOpenAlert] = useState(false);

  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const clickOutside = (e: any) => {
      if (openAlert && ref.current && !ref.current.contains(e.target)) {
        setOpenAlert(false);
      }
    };
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, [openAlert]);

  return (
    <Container openAlert={openAlert}>
      <div className="alert" onClick={(e) => setOpenAlert(!openAlert)}>
        <BsBell className="alert__icon" />
      </div>
      {openAlert && (
        <ul className="dropDown" ref={ref}>
          <li className="dropDown__li-title">알림창</li>
          <li className="dropDown__li">알림</li>
          <li className="dropDown__li">알림</li>
          <li className="dropDown__li">알림</li>
          <li className="dropDown__li">알림</li>
        </ul>
      )}
    </Container>
  );
}

export default Alert;
