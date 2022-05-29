import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { AiOutlineLike, AiOutlineDislike, AiOutlineComment } from 'react-icons/ai';
import { v4 } from 'uuid';
import { useAppDispatch, useAppSelector } from 'store/app/hook';
import { getDrawings, incrementView } from 'store/requests/drawing.request';
import { selectDrawing, selectDrawingDrawings, selectDrawingIsLoading } from 'store/slices/drawing.slice';
import loading from 'assets/images/loading.gif';
import { useObserver } from 'hooks/useObserver';
import { openModal } from 'store/slices/modal.slice';

function Drawing() {
  const { profileId } = useParams();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectDrawingIsLoading);
  const drawings = useAppSelector(selectDrawingDrawings);

  const [cursor, setCursor] = useState<number | null>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // useObserver는 무한스크롤 커스텀 훅이다.
  const targetRef = useRef<HTMLDivElement>(null);
  const isVisible = useObserver(targetRef);

  useEffect(() => {
    // cursor가 0 일때는 더이상 drawing 데이터가 없기 때문이다.
    if (!isVisible || cursor === null) return;
    dispatch(getDrawings({ userId: Number(profileId), cursor: cursor }))
      .unwrap()
      .then((res) => {
        const { newCursor } = res;
        setCursor(newCursor);
      });
  }, [isVisible]);

  const openDrawing = (index: number) => async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(selectDrawing({ selectedIndex: index }));
    await dispatch(incrementView({ drawingId: drawings[index].id }));
    await dispatch(openModal({ modal: 'drawing' }));
  };

  return (
    <Container>
      <DrawingBox>
        {drawings?.map((drawing, index) => (
          <DrawingList
            key={v4()}
            onClick={openDrawing(index)}
            onMouseOver={(e) => setSelectedIndex(index)}
            onMouseOut={(e) => setSelectedIndex(null)}
          >
            <Image src={drawing.url} alt="그림" />
            {index === selectedIndex && (
              <DetailBox>
                <IconBox>
                  <AiOutlineComment size={20} />
                  {drawing.comments?.length}
                </IconBox>
                <IconBox>
                  <AiOutlineLike size={20} />
                  {drawing.likes?.length}
                </IconBox>
                <IconBox>
                  <AiOutlineDislike size={20} />
                  {drawing.dislikes?.length}
                </IconBox>
              </DetailBox>
            )}
          </DrawingList>
        ))}
        {isLoading ? <Image src={loading} alt="로딩중..." /> : null}

        <Observer ref={targetRef} />
      </DrawingBox>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;
const DrawingBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  media ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
const Observer = styled.div`
  border: 1px solid ${({ theme }) => theme.palette.white};
`;

const DrawingList = styled.li`
  position: relative;
  cursor: pointer;
`;
const Image = styled.img``;

const DetailBox = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 0.5rem;
  bottom: 0;
  right: 0;
  background-color: ${({ theme }) => theme.palette.gray};
  opacity: 0.7;
`;

const IconBox = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
`;

export default Drawing;
