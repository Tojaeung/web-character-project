import React, { useState, useEffect } from 'react';
import { Container } from './SettingsList.styled';
import { Link } from 'react-router-dom';

interface IProp {
  list: string;
}

function SettingsList({ list }: IProp) {
  return (
    <Container list={list}>
      <div className="title">설정 🔧</div>
      <ul className="listWrapper">
        <li className="list account">
          <Link to={'/settings/account'} className="link">
            계정
          </Link>
        </li>
        <li className="list alert">
          <Link to={'/settings/alert'} className="link">
            알림
          </Link>
        </li>
      </ul>
    </Container>
  );
}

export default SettingsList;
