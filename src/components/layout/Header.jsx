import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS, SITE } from '../../data/siteContent';
import { SocialLinks } from '../social/social-links';

export function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <NavLink className="site-brand" to="/" onClick={() => setOpen(false)}>米粒的个人网站</NavLink>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((value) => !value)}>{open ? '关闭' : '菜单'}</button>
      <nav className={open ? 'site-nav is-open' : 'site-nav'} id="site-nav" aria-label="主导航">
        {NAV_ITEMS.map((item) => <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)}>{item.label}</NavLink>)}
        <SocialLinks compact label="导航社交主页" />
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`切换到${theme === 'dark' ? '亮色' : '暗色'}模式`}>
          <span aria-hidden="true">{theme === 'dark' ? 'SILVER' : 'VOID'}</span>
        </button>
      </nav>
    </header>
  );
}
