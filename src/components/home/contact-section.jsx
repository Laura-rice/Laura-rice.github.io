import { SocialLinks } from '../social/social-links';
import { ActionLink } from '../ui/ActionLink';

export function ContactSection() {
  return <section className="contact-panel">
    <p className="eyebrow reveal">05 / ELSEWHERE & NEXT</p>
    <h2 className="reveal">下一次连接，<br /><em>从这里开始。</em></h2>
    <div className="contact-bottom"><p>关于代码，关于灵感，<br />也关于一次新的机会。</p><SocialLinks label="联系区社交主页" /><ActionLink to="/about" variant="secondary">查看成长档案</ActionLink></div>
    <div className="contact-signoff"><span>© 2026 YUAN / 米粒</span><span>谢谢你，看到这里。</span><a href="#home">回到顶部 ↑</a></div>
  </section>;
}
