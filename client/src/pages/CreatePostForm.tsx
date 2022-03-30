import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import StyledButton from '@src/styles/StyledButton';
import StyledInput from '@src/styles/StyledInput';
import NotFound from '@src/components/common/NotFound';
import boardTitle from '@src/utils/boardTitle.util';
import { useImageUploadConfig } from '@src/hook/useReactQuillConfig';
import { boardCategory } from '@src/utils/boardCategory.util';

function CreateForm() {
  const navigate = useNavigate();
  const { board } = useParams();

  const quillRef = useRef<ReactQuill>(null);
  const [imageUploadModules, imageKeys] = useImageUploadConfig(quillRef);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onAddPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.post('/api/board/addPost', { title, content, board, imageKeys }, { withCredentials: true });
    const { ok, message, post } = res.data;

    if (!ok) return alert(message);

    alert('글이 등록되었습니다.');
    navigate(`board/${post.board}/post/${post.id}`);
  };

  const onBackToList = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setTitle('');
    setContent('');

    if ((imageKeys as string[]).length === 0) {
      return;
    } else {
      const res = await axios.post('/api/board/imageRemove', imageKeys, { withCredentials: true });
      const { ok, message } = res.data;
      if (!ok) return alert(message);
    }
  };

  return !boardCategory.includes(board as string) ? (
    <NotFound />
  ) : (
    <Container>
      <Title>{boardTitle(board as string)}</Title>
      <StyledInput placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
      <ReactQuill
        ref={quillRef}
        className="ql-editor"
        value={content}
        onChange={setContent}
        modules={imageUploadModules}
        theme="snow"
        placeholder="내용을 입력하세요...."
      />
      <ButtonBox>
        <RegisterButton color="green" size="medium" responsive={true} onClick={onAddPost}>
          등록
        </RegisterButton>
        <BackToListButton color="green" size="medium" responsive={true} inverse={true} onClick={onBackToList}>
          목록으로
        </BackToListButton>
      </ButtonBox>
    </Container>
  );
}

const Container = styled.div`
  width: 60rem;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.palette.shadowColor};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .ql-editor {
    width: 100%;
    min-height: 30rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
    box-shadow: none;
  }
`;
const Title = styled.h1``;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
  gap: 1rem;
`;
const RegisterButton = styled(StyledButton)``;
const BackToListButton = styled(StyledButton)``;

export default CreateForm;