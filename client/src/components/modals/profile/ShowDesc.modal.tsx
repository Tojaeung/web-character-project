import React, { useEffect, useState } from 'react';
import { Container } from './ShowDesc.modal.styled';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '@src/redux/slices/modal.slice';
import { useAppDispatch } from '@src/redux/app/hook';

function ShowDescModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 자기소개 가져오기
  const [desc, setDesc] = useState('');
  useEffect(() => {
    axios.post('/api/profile/getDesc').then((res) => {
      const { ok, message, desc } = res.data;
      if (!ok) return alert(message);
      setDesc(desc);
    });
  }, []);

  // 모달창 닫기
  const onClose = async (e: any) => {
    await dispatch(closeModal());
  };
  return (
    <Container>
      <div className="wrapper">
        <AiOutlineClose className="closeBtn" onClick={onClose} />
        <div className="title">자기소개</div>
        <div className="desc" dangerouslySetInnerHTML={{ __html: desc as string }}></div>
        <div className="btn-wrapper">
          <button
            className="modifyBtn"
            onClick={(e) => {
              navigate('/settings/description');
              onClose(e);
            }}
          >
            수정
          </button>
          <button className="cancelBtn" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </Container>
  );
}

export default ShowDescModal;
