import { useState, useRef } from 'react';
import styled from 'styled-components';
import { BsBell, BsBellFill } from 'react-icons/bs';
import useDropDown from '@src/hook/useDropDown';

function Alert() {
  const [openDropDown, setOpenDropDown] = useState(false);

  const targetRef = useRef<HTMLUListElement>(null);
  useDropDown({ openDropDown, setOpenDropDown, targetRef });

  return (
    <Container onClick={(e) => setOpenDropDown(!openDropDown)}>
      {openDropDown ? <AlertFillIcon /> : <AlertIcon />}

      {openDropDown && (
        <DropDown ref={targetRef}>
          <Title>알림창</Title>
          <AlertList>알림</AlertList>
          <AlertList>알림</AlertList>
          <AlertList>알림</AlertList>
          <AlertList>알림</AlertList>
        </DropDown>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;
const AlertIcon = styled(BsBell)`
  font-size: 2.5rem;
`;
const AlertFillIcon = styled(BsBellFill)`
  font-size: 2.5rem;
`;

const DropDown = styled.ul`
  position: absolute;
  background: ${({ theme }) => theme.palette.bgColor};
  left: -13rem;
  top: 4.3rem;
  width: 20rem;
  font-size: 1.4rem;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  @media ${({ theme }) => theme.device.mobile} {
    top: -20.5rem;
    left: -8rem;
  }
`;
const Title = styled.div`
  text-align: left;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1.5rem;
`;
const AlertList = styled.li`
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
`;
export default Alert;
