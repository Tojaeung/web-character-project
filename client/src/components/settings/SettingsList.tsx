import { useParams } from 'react-router-dom';
import { Container } from './SettingsList.styled';
import { useNavigate } from 'react-router-dom';

function SettingsList() {
  const navigate = useNavigate();
  const { page } = useParams();

  return (
    <Container list={page}>
      <div className="title">설정 🔧</div>
      <ul className="list-wrapper">
        <li className="list account" onClick={() => navigate('/settings/account')}>
          계정
        </li>
        <li className="list description" onClick={() => navigate('/settings/description')}>
          자기소개
        </li>
        <li className="list alert" onClick={() => navigate('/settings/alert')}>
          알림
        </li>
      </ul>
    </Container>
  );
}

export default SettingsList;
