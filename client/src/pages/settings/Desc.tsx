import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { useDefaultConfig } from '@src/hook/useReactQuillConfig';
import TabMenu from './TabMenu';
import Button from '@src/components/Button';

function Desc() {
  const navigate = useNavigate();
  const [defaultModules] = useDefaultConfig();
  const [desc, setDesc] = useState('');

  const onSubmitDesc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.post('/api/settings/editDesc', { desc }, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    navigate(0);
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDesc('');
    navigate(-1);
  };
  return (
    <Container>
      <TabMenu />

      <ReactQuill
        className="ql-editor"
        value={desc}
        onChange={setDesc}
        modules={defaultModules}
        theme="snow"
        placeholder="내용을 입력하세요...."
      />
      <ButtonBox>
        <SubmitButton color="green" size="medium" responsive={true} onClick={onSubmitDesc}>
          확인
        </SubmitButton>
        <CancelButton color="green" size="medium" inverse={true} responsive={true} onClick={onCancel}>
          취소
        </CancelButton>
      </ButtonBox>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.bgColor};
  display: flex;
  flex-direction: column;
  .ql-editor {
    min-height: 20rem;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
  margin-right: 1.5rem;
`;
const SubmitButton = styled(Button)``;
const CancelButton = styled(Button)``;

export default Desc;
