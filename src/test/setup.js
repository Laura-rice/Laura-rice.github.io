import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/**
 * jsdom 没有实现 window.matchMedia，但 gsap 的 ScrollTrigger 在
 * `gsap.registerPlugin(ScrollTrigger)` 时（即模块导入阶段）就会调用它，
 * 那时任何 `beforeEach` 都还没执行，于是整个测试文件在导入期就抛
 * `_win.matchMedia is not a function` 并以 0 个用例失败。
 * 所以必须在这里——测试模块图加载之前——补上。
 */
if (typeof window !== 'undefined' && typeof window.matchMedia !== 'function') {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

afterEach(() => cleanup());
