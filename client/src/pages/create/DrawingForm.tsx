import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GrAddCircle } from 'react-icons/gr';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import Button from '@src/components/Button';
import { useDefaultConfig } from '@src/hook/useReactQuillConfig';
import { useAppSelector, useAppDispatch } from '@src/store/app/hook';
import { selectUserUser } from '@src/store/slices/user.slice';
import { addDrawing } from '@src/store/requests/drawing.request';
import { calcExp } from '@src/store/requests/etc.request';

function DrawingForm() {
  const dispatch = useAppDispatch();
  const [defaultModules] = useDefaultConfig();
  const user = useAppSelector(selectUserUser);

  const drawingInputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState('');

  const [drawing, setDrawing] = useState<File>();
  const [preview, setPreview] = useState('');
  const setPreviewDrawing = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    setDrawing(e.target?.files[0]);
    const fileUrl = URL.createObjectURL(e.target?.files[0]);
    setPreview(fileUrl);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // submit 페이지 초기화 방지
    e.preventDefault();
    if (!drawing) return alert('그림파일을 업로드 하지 않았습니다.');

    const formData = new FormData();
    formData.append('drawing', drawing as File);
    formData.append('content', content);

    try {
      const res = await dispatch(addDrawing(formData)).unwrap();
      alert(res.message);
      await dispatch(calcExp({ value: 1 }));
      window.location.href = `/profile/${user?.id}`;
    } catch (err: any) {
      alert(err.message);
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
        <Input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          ref={drawingInputRef}
          onChange={setPreviewDrawing}
        />
        {preview ? (
          <Image src={preview} alt="그림미리보기" />
        ) : (
          <>
            <AddIcon />
            <GuideText>그림 추가</GuideText>
          </>
        )}
      </Drawing>

      <Form onSubmit={onSubmit}>
        <ReactQuill
          className="ql-editor"
          value={content}
          onChange={setContent}
          modules={defaultModules}
          theme="snow"
          placeholder="내용을 입력하세요....(최대 3000글자)"
        />
        <ButtonWrapper>
          <SubmitButton type="submit" color="green" size="medium">
            추가
          </SubmitButton>
          <CancelButton
            type="button"
            color="green"
            size="medium"
            inverse={true}
            onClick={(e) => {
              window.location.href = `/profile/${user?.id}`;
            }}
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

const SubmitButton = styled(Button)``;
const CancelButton = styled(Button)``;

export default DrawingForm;
