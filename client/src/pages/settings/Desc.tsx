import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { useDefaultConfig } from '@src/hook/useReactQuillConfig';
import TabMenu from './TabMenu';
import Button from '@src/components/Button';
import { useAppDispatch } from '@src/store/app/hook';
import { updateDesc } from '@src/store/requests/user.request';

function Desc() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [defaultModules] = useDefaultConfig();
  const [updatedDesc, setUpdatedDesc] = useState('');

  const onSubmitDesc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await dispatch(updateDesc({ updatedDesc })).unwrap();
      alert(res.message);
      navigate(0);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setUpdatedDesc('');
    navigate(-1);
  };
  return (
    <Container>
      <TabMenu />

      <ReactQuill
        className="ql-editor"
        value={updatedDesc}
        onChange={setUpdatedDesc}
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
