import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '@src/components/Button';
import { useAppDispatch } from '@src/store/app/hook';
import { sendReport } from '@src/store/requests/report.request';
import { DrawingType, PostType } from '@src/types';

interface IProps {
  isOpen: boolean;
  closeReportModal: () => void;
  proof: DrawingType | PostType;
}

function Report({ isOpen, closeReportModal, proof }: IProps) {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const [reportType, setReportType] = useState('');
  const [report, setReport] = useState('');

  const handleCloseModal = (e: any) => {
    closeReportModal();
    setReportType('');
    setReport('');
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reportType === '') {
      return alert('신고 유형을 선택해주세요.');
    } else if (report.length === 0) {
      return alert('내용을 입력해주세요.');
    } else if (report.length > 100) {
      return alert('글자 수를 초과하였습니다.');
    } else {
      try {
        const res = await dispatch(sendReport({ reportType, report, url: location.pathname, proof })).unwrap();
        alert(res.message);
        setReportType('');
        setReport('');
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  if (!isOpen) return null;
  return createPortal(
    <Container>
      <Background onClick={handleCloseModal} />
      <ModalBox>
        <CloseIcon onClick={handleCloseModal} />
        <Title>신고하기🚨🚨</Title>
        <Select name="reportType" value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <Option>신고유형</Option>
          <Option value={'광고'}>광고</Option>
          <Option value={'음란'}>음란</Option>
          <Option value={'욕설'}>욕설,비난</Option>
          <Option value={'기타'}>기타</Option>
        </Select>
        <TextArea
          placeholder="최대 100글자"
          cols={20}
          rows={3}
          wrap="hard"
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />
        <ReportButton color="red" size="small" onClick={handleSubmit}>
          신고하기
        </ReportButton>
      </ModalBox>
    </Container>,
    document.getElementById('reportPortal') as HTMLElement
  );
}

const Container = styled.div``;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1050;
`;
const ModalBox = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.white};
  z-index: 1050;
  gap: 1.5rem;
`;

const CloseIcon = styled(AiOutlineClose)`
  font-size: 2.5rem;
  align-self: flex-end;
`;
const Title = styled.h1`
  align-self: flex-start;
  font-size: 2rem;
  font-weight: bold;
`;
const Select = styled.select`
  align-self: flex-start;
  border: 1px solid ${({ theme }) => theme.palette.gray};
  padding: 0.5rem;
  &:focus {
    border: 1px solid ${({ theme }) => theme.palette.black};
  }
`;
const Option = styled.option`
  font-size: 1.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 5rem;
  resize: none;
  outline: none;
  border: 1px solid ${({ theme }) => theme.palette.gray};
  &:focus {
    border: 1px solid ${({ theme }) => theme.palette.black};
  }
`;
const ReportButton = styled(Button)`
  padding: 1rem;
`;

export default Report;
