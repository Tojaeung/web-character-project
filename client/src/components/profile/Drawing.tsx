import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { getDrawings, getDrawing } from '@src/redux/requests/drawing.request';
import { selectProfileProfile } from '@src/redux/slices/profile.slice';
import { selectDrawingDrawings, selectDrawingIsLoading } from '@src/redux/slices/drawing.slice';
import loading from '@src/assets/images/loading.gif';
import { useObserver } from '@src/hook/useObserver';
import { openModal } from '@src/redux/slices/modal.slice';

function Drawing() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfileProfile);
  const isLoading = useAppSelector(selectDrawingIsLoading);
  const drawings = useAppSelector(selectDrawingDrawings);

  const targetRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<number | null>(null);

  // useObserver는 커스텀 훅이다.
  const isVisible = useObserver(targetRef);

  const importDrawings = async (profileId: number, cursor: number | null) => {
    const res = await dispatch(getDrawings({ profileId: profile?.id, cursor })).unwrap();
    setCursor(res.newCursor);
  };

  useEffect(() => {
    /*
     * isVisible이 false일때는 getDrawing이 작동되지 않게 한다. (오직 true일때만)
     * cursor가 0 일때는 더이상 drawing 데이터가 없기 때문이다.
     */
    if (!isVisible || cursor === 0) {
      return;
    }
    importDrawings(profile?.id!, cursor);
  }, [isVisible]);

  const openDrawing = (index: number) => async (e: React.MouseEvent<HTMLLIElement>) => {
    await dispatch(openModal({ mode: 'showDrawing' }));
    await dispatch(getDrawing({ drawingId: drawings[index].id }));
  };

  return (
    <Container>
      <ul>
        {drawings?.map((drawing, index) => (
          <li className="drawing" key={index} onClick={openDrawing(index)}>
            <img src={drawing.url} alt="그림" />
          </li>
        ))}
        {isLoading ? <img src={loading} alt="로딩중..." /> : null}

        <div className="observer" ref={targetRef} />
      </ul>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    .drawing {
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
        transition: all 0.3s ease-in-out;
      }
    }
  }

  .observer {
    opacity: 0;
  }
  @media ${({ theme }) => theme.device.mobile} {
    ul {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
`;

export default Drawing;
