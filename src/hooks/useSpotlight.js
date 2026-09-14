import { useRef } from 'react';

export function useSpotlight() {
  const frameRef = useRef(0);

  function updateSpotlight(event) {
    const element = event.currentTarget;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const bounds = element.getBoundingClientRect();
      element.style.setProperty('--spot-x', `${clientX - bounds.left}px`);
      element.style.setProperty('--spot-y', `${clientY - bounds.top}px`);
    });
  }

  return updateSpotlight;
}
