import React, { useState, useRef, useEffect } from 'react';
import { BsBell } from 'react-icons/bs';
import styled from 'styled-components';

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
        <BsBell className="icon" />
      </div>
      {openAlert && (
        <ul className="dropDown" ref={ref}>
          <li className="title">알림창</li>
          <li>알림</li>
          <li>알림</li>
          <li>알림</li>
          <li>알림</li>
        </ul>
      )}
    </Container>
  );
}
const Container = styled.div<{ openAlert: boolean }>`
  position: relative;
  background: ${({ theme, openAlert }) => openAlert && theme.palette.gray};

  .alert {
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
      border: 1px solid ${({ theme }) => theme.palette.gray};
    }
    .icon {
      font-size: 2.5rem;
    }
  }
  .dropDown {
    position: absolute;
    background: ${({ theme }) => theme.palette.bgColor};
    right: 0rem;
    top: 5.5rem;
    width: 20rem;
    font-size: 1.4rem;
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.palette.shadowColor};
    .title {
      text-align: left;
      font-weight: 500;
      font-size: 1.5rem;
      padding: 1.5rem;
    }
    li {
      padding: 1rem;
      border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
  }
`;

export default Alert;
