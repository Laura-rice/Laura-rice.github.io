import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders all primary navigation links', () => {
    render(<MemoryRouter><Header theme="light" onToggleTheme={() => {}} /></MemoryRouter>);
    expect(screen.getByRole('link', { name: '米粒的个人网站' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: '项目' })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: '关于' })).toHaveAttribute('href', '/about');
  });

  it('opens the mobile menu and toggles theme', () => {
    const toggle = vi.fn();
    render(<MemoryRouter><Header theme="dark" onToggleTheme={toggle} /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: '菜单' }));
    expect(screen.getByRole('button', { name: '关闭' })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: '切换到亮色模式' }));
    expect(toggle).toHaveBeenCalledOnce();
  });
});
