import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '@src/utils/axios.util';
import { inverseGreenButtonStyle, greenButtonStyle } from '@src/styles/button.style';
import boarName from '@src/utils/boardName.util';
import { useImageUploadConfig } from '@src/hooks/useReactQuillConfig';
import LengthCountInput from '@src/components/LengthCountInput';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectPostPost } from '@src/store/slices/post.slice';
import { updatePost, getPost } from '@src/store/requests/post.request';

function EditForm() {
  const dispatch = useAppDispatch();

  const { board, postId } = useParams();
  const navigate = useNavigate();

  const post = useAppSelector(selectPostPost);

  useEffect(() => {
    dispatch(getPost({ postId: Number(postId) }))
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
      await dispatch(updatePost({ postId: Number(postId), title, content, imageKeys }));
      navigate(-1);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setTitle('');
    setContent('');

    if ((imageKeys as string[]).length) {
      try {
        await instance.post('/posts/remove-imagekey', { imageKeys });
      } catch (err: any) {
        alert(err.message);
      }
    }
    navigate(`/${board}/${post?.id}`);
  };

  return (
    <Container>
      <Title>{boarName} 수정하기</Title>
      <LengthCountInput
        placeholder="제목"
        length={title.length}
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
        placeholder="내용을 입력하세요....(최대 1000글자)"
      />
      <ButtonBox>
        <SubmitButton onClick={handleModify}>수정</SubmitButton>
        <GoBackButton onClick={handleBack}>돌아가기</GoBackButton>
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
const GoBackButton = styled.button`
  ${inverseGreenButtonStyle};
  padding: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
    padding: 0.7rem 1rem;
  }
`;

export default EditForm;
