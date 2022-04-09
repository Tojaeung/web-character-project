import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@src/components/Button';
import boardTitle from '@src/utils/boardTitle.util';
import { useImageUploadConfig } from '@src/hook/useReactQuillConfig';
import LengthCountInput from '@src/components/LengthCountInput';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectPostPost } from '@src/store/slices/post.slice';
import { imageRemove } from '@src/store/requests/post.request';
import { editPost, getPost } from '@src/store/requests/post.request';

function EditForm() {
  const dispatch = useAppDispatch();

  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useAppSelector(selectPostPost);

  useEffect(() => {
    dispatch(getPost({ postId: Number(postId) }))
      .unwrap()
      .then((res) => {
        const post = res.post;
        setTitle(post?.title!);
        setContent(post?.content!);
      });
  }, []);

  const quillRef = useRef<ReactQuill>(null);
  const { imageUploadModules, imageKeys } = useImageUploadConfig(quillRef);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleModify = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (title.length > 50) {
      return alert('제목 글자 수를 초과하였습니다.');
    } else if (title.length === 0) {
      return alert('제목을 입력해주세요.');
    } else if (content.length > 10000) {
      return alert('내용 글자 수를 초과하였습니다.');
    } else if (content.length === 0) {
      return alert('내용을 입력해주세요.');
    } else if (content.length > 10000) {
      return alert('내용 글자 수를 초과하였습니다.');
    } else {
      try {
        await dispatch(editPost({ postId: Number(postId), title, content, imageKeys }));
        navigate(-1);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setTitle('');
    setContent('');

    if ((imageKeys as string[]).length === 0) {
    } else {
      try {
        await dispatch(imageRemove({ imageKeys })).unwrap();
      } catch (err: any) {
        alert(err.message);
      }
    }
    navigate(`/board/${post?.board}/post/${post?.id}`);
  };

  return (
    <Container>
      <Title>{boardTitle(post?.board as string)} 수정하기</Title>
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
        <RegisterButton color="green" size="medium" responsive={true} onClick={handleModify}>
          수정
        </RegisterButton>
        <BackButton color="green" size="medium" responsive={true} inverse={true} onClick={handleBack}>
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
