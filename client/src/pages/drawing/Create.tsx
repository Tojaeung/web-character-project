import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import axios from 'axios';
import styled from 'styled-components';
import { useEditorConfig } from '@src/hook/useEditorConfig';
import { useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import { greenButtonStyle, redButtonStyle, defaultInputStyle } from '@src/styles/GlobalStyles';
import getLevel from '@src/utils/exp.util';

function Create() {
  const navigate = useNavigate();
  const [destModules] = useEditorConfig();
  const user = useAppSelector(selectAuthUser);

  const drawingInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');

  const [drawing, setDrawing] = useState<File>();
  const [preview, setPreview] = useState('');
  const onAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    setDrawing(e.target?.files[0]);
    const fileUrl = URL.createObjectURL(e.target?.files[0]);
    setPreview(fileUrl);
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
  };

  return (
    <Container>
      <h1>그림추가 🎨</h1>
      <hr />
      <div className="user">
        <div className="avatar">
          <img src={user?.avatar} alt="프사" />
        </div>
        <span className="level">[Lv.{getLevel(user?.exp!)}]</span>
        <span className="nickname">{user?.nickname}</span>
      </div>

      <div className="drawing" onClick={(e) => drawingInputRef.current?.click()}>
        <input type="file" accept="image/png, image/jpeg, image/jpg" ref={drawingInputRef} onChange={onAddPhoto} />
        {preview ? (
          <img src={preview} alt="그림미리보기" />
        ) : (
          <>
            <GrAddCircle className="add-icon" />
            <span>그림 추가</span>
          </>
        )}
      </div>

      <div className="form">
        <input placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />

        <ReactQuill
          className="ql-editor"
          value={content}
          onChange={setContent}
          modules={destModules}
          theme="snow"
          placeholder="내용을 입력하세요...."
        />
        <div className="btn">
          <button className="submit-btn" onClick={onSubmit}>
            추가
          </button>
          <button className="cancel-btn" onClick={() => navigate(`/profile/${user?.id}`)}>
            취소
          </button>
        </div>
      </div>
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
  gap: 1rem;

  h1 {
    align-self: flex-start;
    font-size: 2rem;
  }
  hr {
    width: 100%;
  }

  .drawing {
    width: 100%;
    min-height: 20rem;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.palette.white};
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray};
    }
    input {
      display: none;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    span {
      font-size: 1.5rem;
    }
    .add-icon {
      font-size: 5rem;
      margin-bottom: 1rem;
    }
  }

  .user {
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .avatar {
      width: 5rem;
      height: 5rem;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.palette.black};

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .level {
      font-size: 2rem;
    }
    .nickname {
      font-size: 2rem;
      font-weight: 700;
    }
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-self: flex-start;

    input {
      ${defaultInputStyle};
      padding: 1rem;
    }
    .ql-editor {
      width: 100%;
      min-height: 10rem;
    }
    .btn {
      display: flex;
      justify-content: center;
      .submit-btn {
        ${greenButtonStyle};
        padding: 1rem 2rem;
        margin-right: 1rem;
      }
      .cancel-btn {
        ${redButtonStyle};
        padding: 1rem 2rem;
        margin-right: 1.5rem;
      }
    }
  }

  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
  u {
    text-decoration: underline;
  }
  s {
    text-decoration: line-through;
  }

  @media ${({ theme }) => theme.device.mobile} {
    width: 32rem;
    .drawing {
      min-height: 10rem;
    }
  }
`;

export default Create;
