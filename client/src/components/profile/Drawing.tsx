import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/redux/app/hook';
import { getDrawing } from '@src/redux/requests/profile.request';
import { selectDrawings, selectDrawingIsLoading } from '@src/redux/slices/drawing.slice';
import loading from '@src/assets/images/loading.gif';
import styled from 'styled-components';

function Drawing() {
  const dispatch = useAppDispatch();
  const { profileId } = useParams();

  const isLoading = useAppSelector(selectDrawingIsLoading);
  const drawings = useAppSelector(selectDrawings);

  const [cursor, setCursor] = useState<number | null>(null);

  // 처음 그림 가져오기 (cursor = null)
  useEffect(() => {
    dispatch(getDrawing({ profileId, cursor: null }))
      .unwrap()
      .then((res) => {
        const { ok, message, newCursor } = res;
        if (!ok) return alert(message);
        setCursor(newCursor);
      });
  }, []);

  // 다음부터 cursor의 값에 따라 무한스크롤
  const pageEnd = useRef<HTMLInputElement>(null);
  const observer = new IntersectionObserver(
    async (entries) => {
      // if (entries[0].isIntersecting) {
      //   const res = await dispatch(getPhoto({ profileId, cursor })).unwrap();
      //   const { ok, message, newCursor } = res;
      //   if (!ok) return alert(message);
      //   setCursor(newCursor);
      // }
    },
    { threshold: 1 }
  );
  // observer.observe(pageEnd.current as HTMLInputElement);

  return (
    <Container>
      {drawings?.map((drawing) => (
        <div className="drawing-container" key={drawing.id}>
          <div>{drawing.title}</div>
          <img className="drawing-img" src={drawing.url} alt="그림" />
          <div>{drawing.drawingTags.tag}</div>
          <div>{drawing.content}</div>
        </div>
      ))}
      {isLoading ? <img src={loading} alt="로딩중..." /> : null}
      <input type="hidden" ref={pageEnd} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 2rem;
  gap: 1rem;
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: 1fr;
  }
`;

export default Drawing;
