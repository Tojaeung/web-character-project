import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/store/app/hook';
import { getDrawings, addDrawingView } from '@src/store/requests/drawing.request';
import { selectDrawing, selectDrawingDrawings, selectDrawingIsLoading } from '@src/store/slices/drawing.slice';
import { openModal } from '@src/store/slices/modal.slice';
import loading from '@src/assets/images/loading.gif';
import { useObserver } from '@src/hook/useObserver';

function Drawing() {
  const { profileId } = useParams();
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(selectDrawingIsLoading);
  const drawings = useAppSelector(selectDrawingDrawings);

  const [cursor, setCursor] = useState<number | null>(0);

  // useObserver는 무한스크롤 커스텀 훅이다.
  const targetRef = useRef<HTMLDivElement>(null);
  const isVisible = useObserver(targetRef);

  useEffect(() => {
    // cursor가 0 일때는 더이상 drawing 데이터가 없기 때문이다.
    if (!isVisible || cursor === null) {
      return;
    }
    dispatch(getDrawings({ profileId: Number(profileId), cursor: cursor }))
      .unwrap()
      .then((res) => {
        const { newCursor } = res;
        setCursor(newCursor);
      });
  }, [isVisible]);

  const openDrawing = (index: number) => async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(selectDrawing({ selectedIndex: index }));
    await dispatch(addDrawingView({ drawingId: drawings[index].id }));
    await dispatch(openModal({ mode: 'showDrawingModal' }));
  };

  return (
    <Container>
      <DrawingBox>
        {drawings?.map((drawing, index) => (
          <DrawingList key={index} onClick={openDrawing(index)}>
            <Image src={drawing.url} alt="그림" />
          </DrawingList>
        ))}
        {isLoading ? <Image src={loading} alt="로딩중..." /> : null}

        <div className="observer" ref={targetRef} />
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
  @media ${({ theme }) => theme.device.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
const DrawingList = styled.li`
  cursor: pointer;
`;
const Image = styled.img``;

export default Drawing;
