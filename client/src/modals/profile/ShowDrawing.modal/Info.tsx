import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import LikeButton from '@src/components/LikeButton';
import DisLikeButton from '@src/components/DisLikeButton';
import { useAppSelector } from '@src/store/app/hook';
import { selectProfileProfile } from '@src/store/slices/profile.slice';
import { selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';

function Info() {
  const profile = useAppSelector(selectProfileProfile);
  const drawings = useAppSelector(selectDrawingDrawings);
  const index = useAppSelector(selectDrawingIndex);

  return (
    <Container>
      <UserBox>
        <UserInfoBox>
          <Avatar src={profile?.avatar} size="small" />
          <Nickname exp={profile?.exp!} nickname={profile?.nickname!} size="small" />
        </UserInfoBox>
        <CreatedTime createdTime={drawings[index!]?.created_at!} size="small" />
      </UserBox>

      <Content dangerouslySetInnerHTML={{ __html: drawings[index!]?.content as string }} />

      <DrawingInfoBox>
        <ViewsBox>
          <ViewIcon /> {drawings[index!]?.views}
        </ViewsBox>

        <LikeButton
          type="drawing"
          id={drawings[index!]?.id!}
          likes={drawings[index!]?.likes!}
          dislikes={drawings[index!]?.dislikes!}
        />

        <DisLikeButton
          type="drawing"
          id={drawings[index!]?.id!}
          likes={drawings[index!]?.likes!}
          dislikes={drawings[index!]?.dislikes!}
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
