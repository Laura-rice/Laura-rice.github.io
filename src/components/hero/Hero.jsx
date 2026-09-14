import { useRef } from 'react';
import { useHeroMotion } from '../../hooks/use-hero-motion';
import { ActionLink } from '../ui/ActionLink';
import { SocialLinks } from '../social/social-links';
import { HeroVisual } from './hero-visual';

export function Hero() {
  const sectionRef = useRef(null);
  useHeroMotion(sectionRef);
  return (
    <section className="hero" id="home" ref={sectionRef}>
      <div className="hero-sticky">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-halo" aria-hidden="true" />
      <div className="hero-copy">
        <p className="hero-kicker"><span /> 米粒的个人档案 <i> / </i> PORTFOLIO 2026</p>
        <h1 aria-label="TRAIN THE SIGNAL."><span>TRAIN</span><span className="hero-serif">the signal.</span></h1>
        <p className="hero-intro">你好，我是<strong>米粒</strong>。欢迎你。</p>
        <p className="hero-description">在数据中寻找秩序，在日常里收集灵感。<br />一个认真做 AI、也在意表达的人。</p>
        <div className="hero-actions"><ActionLink to="/projects">探索能力实践</ActionLink><ActionLink to="/about" variant="secondary">认识我</ActionLink></div>
        <SocialLinks compact label="首页社交主页" />
      </div>
      <HeroVisual />
      <div className="hero-status"><span>AI 训练师候选人 <i>×</i> 数据科学</span><span>保持好奇，持续生长。</span><a href="#introduction">向下探索 <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  );
}
