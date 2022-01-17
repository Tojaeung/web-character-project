import React, { useState } from 'react';
import { Container } from '@src/components/header/Menu.styled';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

function Menu() {
  const [openPaint, setOpenPaint] = useState(false);
  const [openNovel, setOpenNovel] = useState(false);
  return (
    <Container openPaint={openPaint} openNovel={openNovel}>
      <div className="menu">
        <span className="menu__title">채널명</span>
        <div className="menu__wrapper">
          <div className="menu__channel" onClick={(e) => setOpenPaint(!openPaint)}>
            <span className="menu__channel-name">그림 🎨</span>
            {openPaint ? <FaChevronDown /> : <FaChevronUp />}
          </div>
          {openPaint && (
            <ul className="dropDown">
              <li className="dropDown__li">🙋‍♂️ 리퀘스트</li>
              <li className="dropDown__li">💰 커미션</li>
              <li className="dropDown__li">분양</li>
            </ul>
          )}
        </div>

        <div className="menu__wrapper">
          <div className="menu__channel" onClick={(e) => setOpenNovel(!openNovel)}>
            <span className="menu__channel-name">소설 📖</span>
            {openNovel ? <FaChevronDown /> : <FaChevronUp />}
          </div>
          {openNovel && (
            <ul className="dropDown">
              <li className="dropDown__li">리퀘</li>
              <li className="dropDown__li">커미션</li>
              <li className="dropDown__li">분양</li>
            </ul>
          )}
        </div>
      </div>
      <div className="footer">
        <div>footer</div>
        <div>문의하기</div>
        <div>by Tojaeung</div>
      </div>
    </Container>
  );
}

export default Menu;
