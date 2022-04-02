import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import StyledButton from '@src/styles/StyledButton';
import { useDefaultConfig } from '@src/hook/useReactQuillConfig';
import { useAppSelector } from '@src/store/app/hook';
import { selectAuthUser } from '@src/store/slices/auth.slice';
import LengthCountInput from '@src/components/LengthCountInput';

function DrawingForm() {
  const navigate = useNavigate();
  const [defaultModules] = useDefaultConfig();
  const user = useAppSelector(selectAuthUser);

  const drawingInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [drawing, setDrawing] = useState<File>();
  const [preview, setPreview] = useState('');
  const onAddDrawing = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    setDrawing(e.target?.files[0]);
    const fileUrl = URL.createObjectURL(e.target?.files[0]);
    setPreview(fileUrl);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (title.length > 50) {
      return alert('제목 글자 수를 초과하였습니다.');
    } else if (title.length === 0) {
      return alert('제목을 입력해주세요.');
    } else if (content.length > 10000) {
      return alert('내용 글자 수를 초과하였습니다.');
    } else if (content.length === 0) {
      return alert('내용을 입력해주세요.');
    } else if (!drawing) {
      return alert('그림파일을 업로드 하지 않았습니다.');
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append('drawing', drawing as File);
      formData.append('title', title);
      formData.append('content', content);

      const res = await axios.post('/api/drawing/create', formData, { withCredentials: true });
      const { ok, message } = res.data;
      if (!ok) return alert(message);
      alert(message);
      navigate(`/profile/${user?.id}`);
    }
  };

  return (
    <Container>
      <Title>그림추가 🎨</Title>
      <Hr />
      <User>
        <Avatar src={user?.avatar} size="small" />
        <Nickname exp={user?.exp!} nickname={user?.nickname!} size="medium" />
      </User>

      <Drawing onClick={(e) => drawingInputRef.current?.click()}>
        <Input type="file" accept="image/png, image/jpeg, image/jpg" ref={drawingInputRef} onChange={onAddDrawing} />
        {preview ? (
          <Image src={preview} alt="그림미리보기" />
        ) : (
          <>
            <AddIcon />
            <GuideText>그림 추가</GuideText>
          </>
        )}
      </Drawing>

      <Form>
        <LengthCountInput
          limit={50}
          placeholder="제목"
          valueLength={title.length}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactQuill
          className="ql-editor"
          value={content}
          onChange={setContent}
          modules={defaultModules}
          theme="snow"
          placeholder="내용을 입력하세요...."
        />
        <ButtonWrapper>
          <SubmitButton color="green" size="medium" responsive={true} onClick={onSubmit}>
            추가
          </SubmitButton>
          <CancelButton
            color="green"
            size="medium"
            inverse={true}
            responsive={true}
            onClick={() => navigate(`/profile/${user?.id}`)}
          >
            취소
          </CancelButton>
        </ButtonWrapper>
      </Form>
    </Container>
  );
}
const Container = styled.div`
  width: 60rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: 2rem;
  box-shadow: ${({ theme }) => theme.palette.shadowColor};

  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    box-shadow: none;
  }
`;
const Title = styled.h1`
  align-self: flex-start;
`;

const Hr = styled.hr`
  width: 100%;
`;
const User = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Drawing = styled.div`
  width: 100%;
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.palette.white};
  border: 3px solid ${({ theme }) => theme.palette.gray};
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    background-color: ${({ theme }) => theme.palette.gray};
  }

  @media ${({ theme }) => theme.device.mobile} {
    min-height: 10rem;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const GuideText = styled.span`
  font-size: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 1rem;
  .ql-editor {
    width: 100%;
    min-height: 10rem;
  }
`;

const Input = styled.input`
  display: none;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const AddIcon = styled(GrAddCircle)`
  font-size: 5rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 3rem;
  }
`;

const SubmitButton = styled(StyledButton)``;
const CancelButton = styled(StyledButton)``;

export default DrawingForm;
