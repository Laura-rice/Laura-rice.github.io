import { Link } from 'react-router-dom';
import { SITE } from '../../data/siteContent';
import { SocialLinks } from '../social/social-links';

export function Footer() {
  return (
    <footer className="site-footer">
      <div><strong>{SITE.name}.</strong><p>{SITE.role}</p></div>
      <p>把每一份 AI 数据做得可靠、清楚、可验证。</p>
      <div className="footer-links"><Link to="/projects">项目</Link><span className="footer-email">{SITE.email}</span><SocialLinks compact label="页脚社交主页" /></div>
      <small>© 2026 {SITE.name}</small>
    </footer>
  );
}
