import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Hero } from './Hero';

beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query) => ({
    matches: query.includes('min-width'),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })));
  HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
});

describe('Hero', () => {
  it('keeps identity and actions readable when WebGL is unavailable', () => {
    const { container } = render(<MemoryRouter><Hero /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /TRAIN THE SIGNAL/ })).toBeVisible();
    expect(container.querySelector('.hero-intro')).toHaveTextContent('你好，我是米粒。欢迎你。');
    expect(screen.getByRole('link', { name: /探索能力实践/ })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('img', { name: '米粒的头像' })).toHaveAttribute('src', '/assets/yuan-portrait.jpg');
    expect(screen.getByText('米粒 / Miliiy')).toBeVisible();
    expect(container.querySelector('.hero-id-card__stamp')).not.toBeInTheDocument();
    expect(container.querySelector('.hero-id-note')).not.toBeInTheDocument();
    expect(container.querySelector('.hero-art-caption')).not.toBeInTheDocument();
    expect(container.querySelector('.metal-fallback')).toBeInTheDocument();
    expect(container.querySelector('canvas')).not.toBeInTheDocument();
  });
});
