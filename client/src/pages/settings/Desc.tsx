import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { useDefaultConfig } from '@src/hooks/useReactQuillConfig';
import TabMenu from './common/TabMenu';
import { greenButtonStyle, inverseGreenButtonStyle } from '@src/styles/button.style';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';
import { updateDesc } from '@src/store/requests/user.request';

function Desc() {
  const user = useAppSelector(selectUserUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [defaultModules] = useDefaultConfig();
  const [desc, setDesc] = useState('');

  useEffect(() => {
    setDesc(user?.desc!);
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await dispatch(updateDesc({ updatedDesc: desc })).unwrap();
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
        placeholder="내용을 입력하세요....(최대 500글자)"
      />
      <ButtonBox>
        <SubmitButton onClick={handleSubmit}>확인</SubmitButton>
        <CancelButton onClick={onCancel}>취소</CancelButton>
      </ButtonBox>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.bgColor};
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  display: flex;
  flex-direction: column;
  .ql-editor {
    min-height: 20rem;
  }
  @media ${({ theme }) => theme.device.tablet} {
    box-shadow: none;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
  margin-right: 1.5rem;
`;
const SubmitButton = styled.button`
  ${greenButtonStyle};
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.7rem 1rem;
    font-size: 1.2rem;
  }
`;
const CancelButton = styled.button`
  ${inverseGreenButtonStyle};
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0.7rem 1rem;
    font-size: 1.2rem;
  }
`;

export default Desc;
