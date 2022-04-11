import styled from 'styled-components';
import { AiOutlineEye, AiOutlineMore } from 'react-icons/ai';
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
      <Header>
        <UserBox>
          <Avatar src={profile?.avatar} size="small" />
          <FlexBox>
            <Nickname exp={profile?.exp!} nickname={profile?.nickname!} size="small" />
            <CreatedTime createdTime={drawings[index!]?.created_at!} size="small" />
          </FlexBox>
        </UserBox>
        <MoreIcon />
      </Header>

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
  margin-top: 1rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
`;
const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MoreIcon = styled(AiOutlineMore)`
  font-size: 2rem;
  cursor: pointer;
`;

const Content = styled.div`
  font-size: 1.4rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1.2rem;
  }
`;
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
