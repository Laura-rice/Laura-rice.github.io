import { useEffect, useRef, useState } from 'react';

export function useElementVisibility() {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { elementRef, visible };
}
