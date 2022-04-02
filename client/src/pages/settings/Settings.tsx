import React, { useState } from 'react';
import styled from 'styled-components';
import Account from '@src/pages/settings/Account';
import Alert from '@src/pages/settings/Alert';
import Description from '@src/pages/settings/Desc';

function Settings() {
  const [selectIndex, setSelectIndex] = useState(0);
  const menuArray = ['계정설정', '알림', '소개'];

  const onSelectIndex = (index: number) => (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectIndex(index);
  };

  return (
    <Container>
      <h1>설정</h1>
      <ul className="tab-menu">
        {menuArray.map((menu, index) => {
          return (
            <li key={index} className={selectIndex === index ? 'focused' : 'no'} onClick={onSelectIndex(index)}>
              {menu}
            </li>
          );
        })}
      </ul>
      {selectIndex === 0 && <Account />}
      {selectIndex === 1 && <Alert />}
      {selectIndex === 2 && <Description />}
    </Container>
  );
}

const Container = styled.div`
  width: 70rem;
  background-color: ${({ theme }) => theme.palette.white};
  padding: 2rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  h1 {
    font-size: 3rem;
    font-weight: 700;
    align-self: flex-start;
  }
  .tab-menu {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-self: flex-start;
    li {
      padding: 1rem;
      font-size: 1.5rem;
      border: 1px solid;
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.palette.green};
        color: ${({ theme }) => theme.palette.white};
      }
    }
    .focused {
      color: ${({ theme }) => theme.palette.white};
      background-color: ${({ theme }) => theme.palette.green};
    }
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 32rem;
    h1 {
      font-size: 2rem;
    }
    .tab-menu {
      gap: 0.5rem;
      li {
        font-size: 1.2rem;
      }
    }
  }
`;

export default Settings;
