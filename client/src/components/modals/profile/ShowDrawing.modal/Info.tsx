import React from 'react';
import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import Avatar from '@src/components/common/Avatar';
import Nickname from '@src/components/common/Nickname';
import CreatedTime from '@src/components/common/CreatedTime';
import LikeBtn from '@src/components/common/LikeBtn';
import DisLikeBtn from '@src/components/common/DisLikeBtn';
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
      <div className="profile">
        <div className="flex-wrapper">
          <Avatar src={profile?.avatar} size="small" />
          <Nickname exp={profile?.exp!} nickname={profile?.nickname!} size="small" />
        </div>
        <CreatedTime createdTime={drawings[selectedIndex!]?.created_at!} size="small" />
      </div>

      <div className="content" dangerouslySetInnerHTML={{ __html: drawings[selectedIndex!]?.content as string }} />

      <div className="info">
        <span className="views">
          <AiOutlineEye /> {drawings[selectedIndex!]?.views}
        </span>
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
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .profile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .flex-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .content {
    font-size: 1.5rem;
  }
  .info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid ${({ theme }) => theme.palette.gray};
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray};
    padding: 0.5rem 0;
    .views {
      font-size: 1.5rem;
    }
  }
`;

export default Info;
