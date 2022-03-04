import React, { useState, useRef } from 'react';
import { Container } from './AddPhoto.modal.styled';
import { AiOutlineClose } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEditorConfig } from '@src/hook/useEditorConfig';
import { closeModal } from '@src/redux/slices/modal.slice';
import { useAppDispatch } from '@src/redux/app/hook';

function AddPhotoModal() {
  const dispatch = useAppDispatch();
  const [destModules] = useEditorConfig();

  const photoInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');

  const [photo, setPhoto] = useState<File>();
  const onAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target?.files) return;
    setPhoto(e.target?.files[0]);
  };

  const onClose = async (e: React.MouseEvent<SVGElement>) => {
    await dispatch(closeModal());
  };

  return (
    <Container>
      <form className="form">
        <AiOutlineClose className="closeBtn" onClick={onClose} />
        <div className="title">그림추가 🎨</div>
        <div className="input-wrapper">
          <input className="input" placeholder="제목을 입력하세요." />
        </div>

        <div className="input-wrapper">
          <input className="input" placeholder="#Tags" />
        </div>
        <ReactQuill
          className="ql-editor"
          value={content}
          onChange={setContent}
          modules={destModules}
          theme="snow"
          placeholder="내용을 입력하세요...."
        />

        <div className="addPhoto-wrapper">
          <button className="addPhoto-btn" onClick={(e) => photoInputRef.current?.click()}>
            그림+
          </button>
          {photo && <div className="photo-filename">{photo}</div>}

          <input
            className="photo-input"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={photoInputRef}
            onChange={onAddPhoto}
          />
        </div>

        <div className="btn-wrapper">
          <button className="submitBtn">추가</button>
          <button className="cancelBtn">취소</button>
        </div>
      </form>
    </Container>
  );
}

export default AddPhotoModal;
