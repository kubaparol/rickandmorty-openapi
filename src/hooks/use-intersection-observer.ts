import { useEffect, useRef } from 'react';

export const useIntersectionObserver = <Element extends HTMLElement>(
  onIntersecting: () => void,
  options?: IntersectionObserverInit,
) => {
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersecting();
        }
      },
      { threshold: 1, rootMargin: '0px', ...options },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onIntersecting, options]);

  return ref;
};
