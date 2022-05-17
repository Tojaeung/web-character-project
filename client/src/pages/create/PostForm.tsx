import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import instance from '@src/utils/axios.util';
import { greenButtonStyle, inverseGreenButtonStyle } from '@src/styles/button.style';
import NotFound from '@src/components/NotFound';
import boardCategory from '@src/utils/boardCategory.util';
import boardName from '@src/utils/boardName.util';
import { useImageUploadConfig } from '@src/hooks/useReactQuillConfig';
import LengthCountInput from '@src/components/LengthCountInput';
import { useAppDispatch } from '@src/store/app/hook';
import { createPost } from '@src/store/requests/post.request';

function PostForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { board } = useParams();

  const quillRef = useRef<ReactQuill>(null);
  const { imageUploadModules, imageKeys } = useImageUploadConfig(quillRef);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await dispatch(createPost({ title, content, board: board as string, imageKeys })).unwrap();
      const { message, newPostJoinAll } = res;
      alert(message);
      navigate(`/${board}/${newPostJoinAll.id}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleBackBoard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setTitle('');
    setContent('');

    if (imageKeys.length > 0) {
      try {
        await instance.post('/posts/remove-imagekey', { imageKeys });
      } catch (err: any) {
        alert(err.message);
      }
    }
    navigate(-1);
  };

  if (!boardCategory.includes(board as string)) return <NotFound />;
  return (
    <Container>
      <Title>{boardName(board as string)}</Title>
      <LengthCountInput placeholder="제목" length={title.length} onChange={(e) => setTitle(e.target.value)} />
      <ReactQuill
        ref={quillRef}
        className="ql-editor"
        value={content}
        onChange={setContent}
        modules={imageUploadModules}
        theme="snow"
        placeholder="내용을 입력하세요....(최대 1000글자)"
      />
      <ButtonBox>
        <SubmitButton onClick={handleAddPost}>등록</SubmitButton>
        <GoListButton onClick={handleBackBoard}>목록으로</GoListButton>
      </ButtonBox>
    </Container>
  );
}

const Container = styled.div`
  width: 70rem;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .ql-editor {
    width: 100%;
    font-size: 1.5rem;
    min-height: 30rem;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    box-shadow: none;
  }
  @media ${({ theme }) => theme.device.mobile} {
    .ql-editor {
      min-height: 10rem;
      font-size: 1.2rem;
    }
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.5rem;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
  gap: 1rem;
`;
const SubmitButton = styled.button`
  ${greenButtonStyle};
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
    padding: 0.7rem 1rem;
  }
`;
const GoListButton = styled.button`
  ${inverseGreenButtonStyle};
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
    padding: 0.7rem 1rem;
  }
`;

export default PostForm;
