import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scope the short exhibition scroll to desktop users who allow motion.
 *
 * 注意：**不要给 `.hero-art-stage` 加任何 transform**。
 * `hero-visual.jsx` 里的 `.hero-art-stage` 没有 CSS，而它的子元素 `.liquid-scene` 是
 * position:absolute（相对 `.hero` 定位）。父级一旦带 transform 就会成为新的包含块，
 * 绝对定位的球体会重新锚定到这个零高度盒子上，表现为滚动时球体位移并缩小；
 * 同时每帧缩放「含 WebGL canvas 的图层」还会强制重栅格化，造成滚动卡顿。
 */
export function useHeroMotion(sectionRef) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 1000px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current;
      const timeline = gsap.timeline({ scrollTrigger: {
        trigger: section, start: 'top top', end: 'bottom top', scrub: 1,
      } });
      timeline.to(section.querySelector('.hero-copy'), { y: -65, opacity: 0.2, ease: 'none' }, 0);
      return () => timeline.kill();
    }, sectionRef);
    return () => media.revert();
  }, [sectionRef]);
}
