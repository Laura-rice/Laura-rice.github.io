import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function readMobileState() {
  return window.matchMedia('(max-width: 767px)').matches;
}

export function useWonderMotion(containerRef) {
  const [progress, setProgress] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const pointerFrame = useRef(null);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const smoothTarget = useRef(0);
  const smoothFrame = useRef(null);
  const smoothValue = useRef(0);
  const momentumValue = useRef(0);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReduce = () => setReduceMotion(media.matches);
    updateReduce();
    media.addEventListener?.('change', updateReduce);
    return () => media.removeEventListener?.('change', updateReduce);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const updateMobile = () => setIsMobile(readMobileState());
    updateMobile();
    media.addEventListener?.('change', updateMobile);
    return () => media.removeEventListener?.('change', updateMobile);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const element = containerRef.current;
      const maxScroll = element ? element.offsetHeight - window.innerHeight : 0;
      const distance = element ? -element.getBoundingClientRect().top : 0;
      const next = clamp(maxScroll > 0 ? distance / maxScroll : 0, 0, 1);
      setProgress(next);
      smoothTarget.current = next;
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, [containerRef]);

  // rAF 平滑滚动进度 + 滚动动量：草丛递进 / 风吹草动用，避免滚轮每帧跳变
  useEffect(() => {
    if (reduceMotion) {
      setSmoothProgress(smoothTarget.current);
      setMomentum(0);
      return undefined;
    }
    const tick = () => {
      smoothValue.current += (smoothTarget.current - smoothValue.current) * 0.12;
      const remaining = smoothTarget.current - smoothValue.current;
      if (Math.abs(remaining) < 0.0004) smoothValue.current = smoothTarget.current;
      // 剩余距离越大 = 滚动越快，用来驱动草叶加幅与光斑
      const nextMomentum = clamp(Math.abs(remaining) * 14, 0, 1);
      momentumValue.current += (nextMomentum - momentumValue.current) * 0.2;
      setSmoothProgress(smoothValue.current);
      setMomentum(momentumValue.current);
      smoothFrame.current = window.requestAnimationFrame(tick);
    };
    smoothFrame.current = window.requestAnimationFrame(tick);
    return () => {
      if (smoothFrame.current) window.cancelAnimationFrame(smoothFrame.current);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const updatePointer = (event) => {
      pointerTarget.current = {
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      };
      if (pointerFrame.current) return;
      pointerFrame.current = window.requestAnimationFrame(() => {
        setMouse(pointerTarget.current);
        pointerFrame.current = null;
      });
    };
    window.addEventListener('pointermove', updatePointer, { passive: true });
    const openTimer = window.setTimeout(() => setCurtainsOpen(true), 100);
    const doneTimer = window.setTimeout(() => setEntranceDone(true), 2200);
    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
      if (pointerFrame.current) window.cancelAnimationFrame(pointerFrame.current);
    };
  }, []);

  return { progress, smoothProgress, momentum, mouse, isMobile, curtainsOpen, entranceDone, reduceMotion };
}
