import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import LikeBtn from '@src/components/LikeBtn';
import DisLikeBtn from '@src/components/DisLikeBtn';
import { useAppSelector } from '@src/store/app/hook';
import { selectProfileProfile } from '@src/store/slices/profile.slice';
import { selectDrawingSelectedDrawing } from '@src/store/slices/drawing.slice';

function Info() {
  const profile = useAppSelector(selectProfileProfile);
  const selectedDrawing = useAppSelector(selectDrawingSelectedDrawing);

  return (
    <Container>
      <UserBox>
        <UserInfoBox>
          <Avatar src={profile?.avatar} size="small" />
          <Nickname exp={profile?.exp!} nickname={profile?.nickname!} size="small" />
        </UserInfoBox>
        <CreatedTime createdTime={selectedDrawing?.created_at!} size="small" />
      </UserBox>

      <Content dangerouslySetInnerHTML={{ __html: selectedDrawing?.content as string }} />

      <DrawingInfoBox>
        <ViewsBox>
          <ViewIcon /> {selectedDrawing?.views}
        </ViewsBox>

        <LikeBtn
          id={selectedDrawing?.id!}
          likes={selectedDrawing?.likes!}
          dislikes={selectedDrawing?.dislikes!}
          category="drawing"
        />

        <DisLikeBtn
          id={selectedDrawing?.id!}
          likes={selectedDrawing?.likes!}
          dislikes={selectedDrawing?.dislikes!}
          category="drawing"
        />
      </DrawingInfoBox>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Content = styled.div``;
const DrawingInfoBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.palette.gray};
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
  padding: 0.5rem 0;
`;
const ViewsBox = styled.span`
  font-size: 1.5rem;
`;
const ViewIcon = styled(AiOutlineEye)``;

export default Info;
