import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { useDefaultConfig } from '@src/hook/useReactQuillConfig';
import TabMenu from './TabMenu';
import Button from '@src/components/Button';
import { useAppDispatch } from '@src/store/app/hook';
import { editDesc } from '@src/store/requests/settings.request';

function Desc() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [defaultModules] = useDefaultConfig();
  const [desc, setDesc] = useState('');

  const onSubmitDesc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (desc.length === 0) {
      return alert('자기소개를 입력해주세요.');
    } else if (desc.length > 5000) {
      return alert('글자 수를 초과하였습니다.');
    }
    try {
      const res = await dispatch(editDesc({ desc })).unwrap();
      alert(res.message);
      navigate(0);
    } catch (err: any) {
      alert(err.message);
    }
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
        placeholder="내용을 입력하세요....(최대 1000글자)"
      />
      <ButtonBox>
        <SubmitButton color="green" size="medium" onClick={onSubmitDesc}>
          확인
        </SubmitButton>
        <CancelButton color="green" size="medium" inverse={true} onClick={onCancel}>
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
