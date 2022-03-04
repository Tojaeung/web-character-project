import React, { useState, useRef } from 'react';
import { Container } from './Create.styled';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import { IoIosClose } from 'react-icons/io';
import { useEditorConfig } from '@src/hook/useEditorConfig';
import { useAppSelector } from '@src/redux/app/hook';
import { selectAuthUser } from '@src/redux/slices/auth.slice';
import axios from 'axios';

function Create() {
  const navigate = useNavigate();
  const [destModules] = useEditorConfig();
  const user = useAppSelector(selectAuthUser);

  const photoInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');

  const [tags, setTags] = useState<string[]>([]);
  // 해시태그 입력
  const onKeyDown = (e: any) => {
    // 인풋 엔터클릭하면 폼이 자동으로 제출되는 현상 방지
    e.preventDefault();

    // 엔터키 말고 다른키 누르면 그대로 종료
    if (e.key !== 'Enter') return;
    const value = e.target.value;

    // 아무것도 입력안하거나 오직 스페이스만 눌렀을때 종료
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = '';
  };

  // 해시태그 제거
  const onRemoveTag = (index: number) => (e: React.MouseEvent<SVGElement>) => {
    setTags(tags.filter((tag, idx) => idx !== index));
  };

  const [content, setContent] = useState('');

  const [photo, setPhoto] = useState<File>();
  const [preview, setPreview] = useState('');
  const onAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target?.files) return;
    setPhoto(e.target?.files[0]);
    const fileUrl = URL.createObjectURL(e.target?.files[0]);
    setPreview(fileUrl);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', photo as File);
    formData.append('title', title);
    tags.forEach((tag) => formData.append('tags', tag));
    formData.append('content', content);

    const res = await axios.post('/api/photo/create', formData, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
    navigate(`/profile/${user?.id}`);
  };

  return (
    <Container>
      <form className="form" onSubmit={onSubmit}>
        <div className="title">그림추가 🎨</div>
        <div className="wrapper">
          <div className="photo-wrapper" onClick={(e) => photoInputRef.current?.click()}>
            <input
              className="photo-input"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              ref={photoInputRef}
              onChange={onAddPhoto}
            />
            {preview ? (
              <img className="photo-preview" src={preview} alt="그림미리보기" />
            ) : (
              <>
                <GrAddCircle className="add-icon" />
                <div className="photo-guide">그림 추가</div>
              </>
            )}
          </div>
          <div className="info-wrapper">
            <div className="user-wrapper">
              <div className="avatar-wrapper">
                <img className="avatar-img" src={user?.avatar} alt="프사" />
              </div>
              <div className="level">[Lv.{user?.level}]</div>
              <div className="nickname">{user?.nickname}</div>
            </div>

            <div className="input-wrapper">
              <input className="input" placeholder="제목" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="tags-wrapper">
              {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                  <span className="text">{tag}</span>
                  <IoIosClose className="close" onClick={onRemoveTag(index)} />
                </div>
              ))}

              <input className="tags-input" type="text" placeholder="태그입력..." onKeyDown={onKeyDown} />
            </div>
            <ReactQuill
              className="ql-editor"
              value={content}
              onChange={setContent}
              modules={destModules}
              theme="snow"
              placeholder="내용을 입력하세요...."
            />
            <div className="btn-wrapper">
              <button className="submit-btn" type="submit">
                추가
              </button>
              <button className="cancel-btn" onClick={() => navigate(`/profile/${user?.id}`)}>
                취소
              </button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
}

export default Create;
