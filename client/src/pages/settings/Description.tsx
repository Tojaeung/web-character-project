import { useState } from 'react';
import { Container } from './Description.styled';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import SettingsList from '@src/components/settings/SettingsList';
import { useEditorConfig } from '@src/hook/useEditorConfig';

function Description() {
  const navigate = useNavigate();
  const [destModules] = useEditorConfig();
  const [desc, setDesc] = useState('');

  const onSubmitDesc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const res = await axios.post('/api/settings/editDesc', { desc }, { withCredentials: true });
    const { ok, message } = res.data;
    if (!ok) return alert(message);
    alert(message);
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDesc('');
    navigate(-1);
  };
  return (
    <Container>
      <SettingsList />
      <div className="wrapper">
        <ReactQuill
          className="ql-editor"
          value={desc}
          onChange={setDesc}
          modules={destModules}
          theme="snow"
          placeholder="내용을 입력하세요...."
        />
        <div className="btn-wrapper">
          <button className="submit-btn" onClick={onSubmitDesc}>
            확인
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            취소
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Description;
