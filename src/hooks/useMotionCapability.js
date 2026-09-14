import { useEffect, useState } from 'react';

function canRenderWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function useMotionCapability() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = matchMedia('(min-width: 768px)');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(desktop.matches && !reducedMotion.matches && canRenderWebGL());
    update();
    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return enabled;
}
