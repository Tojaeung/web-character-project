import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import LikeBtn from '@src/components/LikeBtn';
import DisLikeBtn from '@src/components/DisLikeBtn';
import { useAppSelector } from '@src/store/app/hook';
import { selectProfileProfile } from '@src/store/slices/profile.slice';
import { selectDrawingDrawings } from '@src/store/slices/drawing.slice';
import { selectDrawingIndex } from '@src/store/slices/drawing.slice';

function Info() {
  const profile = useAppSelector(selectProfileProfile);
  const drawings = useAppSelector(selectDrawingDrawings);
  const selectedIndex = useAppSelector(selectDrawingIndex);

  return (
    <Container>
      <UserBox>
        <UserInfoBox>
          <Avatar src={profile?.avatar} size="small" />
          <Nickname exp={profile?.exp!} nickname={profile?.nickname!} size="small" />
        </UserInfoBox>
        <CreatedTime createdTime={drawings[selectedIndex!]?.created_at!} size="small" />
      </UserBox>

      <Content dangerouslySetInnerHTML={{ __html: drawings[selectedIndex!]?.content as string }} />

      <DrawingInfoBox>
        <ViewsBox>
          <ViewIcon /> {drawings[selectedIndex!]?.views}
        </ViewsBox>

        <LikeBtn
          id={drawings[selectedIndex!]?.id!}
          likes={drawings[selectedIndex!]?.likes!}
          dislikes={drawings[selectedIndex!]?.dislikes!}
          category="drawing"
        />

        <DisLikeBtn
          id={drawings[selectedIndex!]?.id!}
          likes={drawings[selectedIndex!]?.likes!}
          dislikes={drawings[selectedIndex!]?.dislikes!}
          category="drawing"
        />
      </DrawingInfoBox>
    </Container>
  );
}
const Container = styled.div`
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
