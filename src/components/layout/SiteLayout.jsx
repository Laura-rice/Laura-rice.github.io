import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { useTheme } from '../../hooks/useTheme';
import { AiTrigger } from '../chatbot/AiTrigger';
import { WonderPageFrame } from './WonderPageFrame';

export function SiteLayout() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isHome = pathname === '/';
  const isImmersivePage = pathname === '/about';
  return (
    <div className={isHome ? 'site-shell is-home' : 'site-shell wonder-shell'}>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <AiTrigger />
      {isHome ? <Outlet /> : <WonderPageFrame immersive={isImmersivePage}><Outlet /><Footer /></WonderPageFrame>}
    </div>
  );
}
