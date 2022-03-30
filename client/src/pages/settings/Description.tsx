import { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { greenButtonStyle, redButtonStyle } from '@src/styles/GlobalStyles';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { useDefaultConfig } from '@src/hook/useReactQuillConfig';

function Description() {
  const navigate = useNavigate();
  const [defaultModules] = useDefaultConfig();
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
      <div className="wrapper">
        <ReactQuill
          className="ql-editor"
          value={desc}
          onChange={setDesc}
          modules={defaultModules}
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

const Container = styled.div`
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
  .wrapper {
    width: 70rem;
    display: flex;
    flex-direction: column;
  }
  .ql-editor {
    width: 100%;
    min-height: 10rem;
    font-size: 1.5rem;
  }
  .btn-wrapper {
    align-self: flex-end;
    padding: 1rem 2rem;
  }
  .submit-btn {
    padding: 1rem 2rem;
  }
  .cancel-btn {
    margin-left: 1rem;

    padding: 1rem 2rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    .wrapper {
      width: 32rem;
    }
    .ql-editor {
      font-size: 1.2rem;
    }
  }
`;

export default Description;
