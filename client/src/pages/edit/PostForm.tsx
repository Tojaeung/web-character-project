import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Button from '@src/components/Button';
import boarName from '@src/utils/boardName.util';
import { useImageUploadConfig } from '@src/hooks/useReactQuillConfig';
import LengthCountInput from '@src/components/LengthCountInput';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectPostPost } from '@src/store/slices/post.slice';
import { updatePost, getPost } from '@src/store/requests/board.request';

function EditForm() {
  const dispatch = useAppDispatch();

  const { board, postId } = useParams();
  const navigate = useNavigate();

  const post = useAppSelector(selectPostPost);

  useEffect(() => {
    dispatch(getPost({ board: board as string, postId: Number(postId) }))
      .unwrap()
      .then((res) => {
        const { postJoinAll } = res;
        setTitle(postJoinAll?.title!);
        setContent(postJoinAll?.content!);
      });
  }, []);

  const quillRef = useRef<ReactQuill>(null);
  const { imageUploadModules, imageKeys } = useImageUploadConfig(quillRef);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleModify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await dispatch(updatePost({ board: board as string, postId: Number(postId), title, content, imageKeys }));
      navigate(-1);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setTitle('');
    setContent('');

    if (!(imageKeys as string[]).length) {
    } else {
      try {
        await axios.post('/api/posts/remove-imagekey', imageKeys, { withCredentials: true });
      } catch (err: any) {
        alert(err.message);
      }
    }
    navigate(`/board/${board}/post/${post?.id}`);
  };

  return (
    <Container>
      <Title>{boarName} 수정하기</Title>
      <LengthCountInput
        limit={50}
        placeholder="제목"
        valueLength={title.length}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ReactQuill
        ref={quillRef}
        className="ql-editor"
        value={content}
        onChange={setContent}
        modules={imageUploadModules}
        theme="snow"
        placeholder="내용을 입력하세요....(최대 3000글자)"
      />
      <ButtonBox>
        <RegisterButton color="green" size="medium" onClick={handleModify}>
          수정
        </RegisterButton>
        <BackButton color="green" size="medium" inverse={true} onClick={handleBack}>
          돌아가기
        </BackButton>
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
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
    box-shadow: none;
  }
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
  gap: 1rem;
`;
const RegisterButton = styled(Button)``;
const BackButton = styled(Button)``;

export default EditForm;
