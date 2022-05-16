import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import Avatar from '@src/components/Avatar';
import Nickname from '@src/components/Nickname';
import CreatedTime from '@src/components/CreatedTime';
import LikeButton from '@src/components/LikeButton';
import DisLikeButton from '@src/components/DisLikeButton';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { selectDrawingDrawings, selectDrawingIndex } from '@src/store/slices/drawing.slice';
import { closeModal } from '@src/store/slices/modal.slice';
import { deleteDrawing } from '@src/store/requests/drawing.request';
import MoreButton from '@src/components/MoreButton';

function Info() {
  const dispatch = useAppDispatch();

  const drawings = useAppSelector(selectDrawingDrawings);
  const index = useAppSelector(selectDrawingIndex);

  const handleDrawingRemove = async (e: any) => {
    try {
      const res = await dispatch(deleteDrawing({ drawingId: drawings[index!].id })).unwrap();
      await dispatch(closeModal());
      alert(res.message);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Container>
      <Header>
        <UserBox>
          <Avatar src={drawings[index!].user?.avatar} diameter={3.5} />
          <FlexBox>
            <Nickname
              exp={drawings[index!].user?.exp!}
              userId={drawings[index!].user?.id}
              chatId={drawings[index!].user?.chatId}
              desc={drawings[index!].user?.desc}
              nickname={drawings[index!].user?.nickname!}
              dropDown={true}
              fontSize={1.3}
            />
            <CreatedTime createdTime={drawings[index!]?.created_at!} fontSize={1.2} />
          </FlexBox>
        </UserBox>
        <MoreButton
          type="drawing"
          entityId={drawings[index!].id}
          userId={drawings[index!].user?.id!}
          handleRemove={handleDrawingRemove}
        />
      </Header>

      <Content dangerouslySetInnerHTML={{ __html: drawings[index!]?.content as string }} />

      <DrawingInfoBox>
        <ViewsBox>
          <ViewIcon /> {drawings[index!]?.views}
        </ViewsBox>

        <LikeButton
          type="drawing"
          drawingId={drawings[index!]?.id!}
          userId={drawings[index!]?.user?.id!}
          likes={drawings[index!]?.likes!}
          dislikes={drawings[index!]?.dislikes!}
        />

        <DisLikeButton
          type="drawing"
          drawingId={drawings[index!]?.id!}
          userId={drawings[index!]?.user?.id!}
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
  z-index: 5232;
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
