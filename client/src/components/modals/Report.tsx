import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Button from '@src/components/Button';
import { useAppDispatch } from '@src/store/app/hook';
import { sendReport } from '@src/store/requests/etc.request';
import { closeModal } from '@src/store/slices/modal.slice';

interface IProp {
  props: { suspectId: number }; // 용의자 id (신고당한사람)
}

function Report({ props }: IProp) {
  const location = useLocation();

  const dispatch = useAppDispatch();

  const [reportType, setReportType] = useState('');
  const [report, setReport] = useState('');

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await dispatch(
        sendReport({ reportType, report, url: location.pathname, suspectId: props.suspectId })
      ).unwrap();
      alert(res.message);
      setReportType('');
      setReport('');
      closeModal();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Container>
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
    </Container>
  );
}

const Container = styled.div``;

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
