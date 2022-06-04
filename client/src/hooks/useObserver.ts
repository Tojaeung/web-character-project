import React, { useState, useEffect } from 'react';

export const useObserver = (targetRef: React.RefObject<HTMLDivElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    setIsVisible(entries[0].isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, { root: null, rootMargin: '0px', threshold: 0 });
    targetRef.current && observer.observe(targetRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isVisible;
};
