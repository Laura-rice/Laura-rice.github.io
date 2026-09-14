import { useRef } from 'react';
import { clamp, lerp, useWonderMotion } from '../../hooks/use-wonder-motion';
import { WONDER_CARD_IMAGES, WONDER_CARDS } from './wonder-data';
import { CavePortal } from './CavePortal';

function SceneOne({ opacity, visible, progress }) {
  const exit = clamp(progress / 0.22, 0, 1);
  return (
    <section className="wonder-scene wonder-scene--one" style={{ opacity }} aria-label="进入米粒的创作世界">
      <div className={visible ? 'wonder-copy is-visible' : 'wonder-copy'}>
        <div className="wonder-copy__inner" style={{ transform: `translate3d(0, ${lerp(0, -54, exit)}px, 0) scale(${(1 + exit * 0.05).toFixed(3)})` }}>
          <p className="wonder-copy__eyebrow">米粒 / MILIiy · AI TRAINER</p>
          <h1><span>FALL <em>›</em> INTO</span><strong>REVERIE</strong></h1>
          <p>Crafting thoughtful systems where AI, data, vision, and everyday curiosity meet.</p>
        </div>
      </div>
      <div className={visible ? 'wonder-reel-cards is-visible' : 'wonder-reel-cards'}>
        {WONDER_CARD_IMAGES.map((image, index) => (
          <article
            className="wonder-reel-card"
            key={image}
            style={{
              backgroundImage: `url(${image})`,
              opacity: visible ? 1 : 0,
              transition: `opacity .8s ease ${(0.5 + index * 0.12).toFixed(2)}s, box-shadow .4s ease`,
              transform: `translate3d(0, ${lerp(0, -24 - index * 12, exit).toFixed(1)}px, 0) rotate(${lerp(0, (index - 1) * 4.5, exit).toFixed(2)}deg)`,
            }}
          >
            <span>{index === 1 ? '32 / NOTES' : 'VIEW REEL'}</span>
          </article>
        ))}
      </div>
      <div className="wonder-dots" aria-hidden="true"><i className="is-active" /><i /><i /><i /></div>
      <div className="wonder-scroll-cue" aria-hidden="true"><span>DESCEND</span><b>⌄</b></div>
    </section>
  );
}

function ArcCardSlider({ progress, isMobile }) {
  const spacing = isMobile ? 12 : 9;
  const radius = isMobile ? 700 : 1100;
  const cardSweep = (WONDER_CARDS.length - 1) * 10;
  const rotationOffset = lerp(0, cardSweep, clamp((progress - 0.7) / 0.3, 0, 1));
  const centerIndex = Math.floor(WONDER_CARDS.length / 2);
  return (
    <div className="wonder-arc-slider" aria-label="米粒的创作主题">
      {WONDER_CARDS.map((card) => {
        const degree = (card.index - centerIndex) * spacing - rotationOffset + centerIndex * spacing;
        const radians = degree * Math.PI / 180;
        const x = Math.sin(radians) * radius;
        const y = radius - Math.cos(radians) * radius;
        // 离弧线顶点越远越后仰：淡出 + 缩小，形成纵深
        const depth = clamp(Math.abs(degree) / 42, 0, 1);
        return <article className="wonder-arc-card" key={card.title} style={{ '--wonder-card-color': card.color, '--arc-i': card.index, left: '50%', bottom: `${-y + (isMobile ? 140 : 200)}px`, transform: `translateX(calc(-50% + ${x}px)) rotate(${degree}deg) scale(${(1 - depth * 0.08).toFixed(3)})`, transformOrigin: `50% ${radius}px`, opacity: (1 - depth * 0.42).toFixed(3) }}><span>{String(card.index + 1).padStart(2, '0')}</span><div><h3>{card.title}</h3><p>{card.description}</p></div></article>;
      })}
    </div>
  );
}

const SCENE_TWO_WORDS = ['FORGE', 'BEYOND', 'THE', 'REAL'];

function SceneTwo({ opacity, progress }) {
  return (
    <section className="wonder-scene wonder-scene--two" style={{ opacity }} aria-label="超越现实的创作主题">
      <h2>
        {SCENE_TWO_WORDS.map((word, index) => {
          const t = clamp((progress - 0.68 - index * 0.016) / 0.07, 0, 1);
          return (
            <span key={word} style={{ opacity: t, transform: `translate3d(0, ${lerp(30, 0, t).toFixed(1)}px, 0) rotate(${lerp(4, 0, t).toFixed(2)}deg)` }}>
              {index > 0 ? ' ' : ''}{word}
            </span>
          );
        })}
      </h2>
      <p style={{ transform: `translate3d(0, ${lerp(26, 0, clamp((progress - 0.74) / 0.1, 0, 1)).toFixed(1)}px, 0)`, opacity: clamp((progress - 0.74) / 0.1, 0, 1) }}>Singular voyages to astonishing destinations, shaped for those who seek beauty beyond the ordinary and the known.</p>
    </section>
  );
}

const STREAKS = [8, 22, 37, 50, 63, 78, 92];

const MOTES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53 + 7) % 100,
  top: (i * 37 + 11) % 100,
  size: 1.5 + ((i * 7) % 3),
  dur: 9 + ((i * 5) % 9),
  delay: -((i * 3.3) % 12),
  warm: i % 3 === 0,
}));

function Motes({ progress }) {
  const opacity = 0.18 + 0.42 * (1 - clamp((progress - 0.78) / 0.22, 0, 1));
  return (
    <div className="wonder-motes" aria-hidden="true" style={{ opacity }}>
      {MOTES.map((mote, index) => (
        <i
          key={index}
          className={mote.warm ? 'is-warm' : undefined}
          style={{
            left: `${mote.left}%`,
            top: `${mote.top}%`,
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            animationDuration: `${mote.dur}s, ${4 + (index % 4)}s`,
            animationDelay: `${mote.delay}s, ${-mote.delay * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}

const BLOOM_POSITIONS = [
  ['2%', '0%', '180px', 'var(--wonder-rose)', '-12deg'],
  ['17%', '10%', '132px', 'var(--wonder-lilac)', '9deg'],
  ['34%', '-3%', '210px', 'var(--wonder-sand)', '-7deg'],
  ['56%', '6%', '148px', 'var(--wonder-rose)', '14deg'],
  ['72%', '-4%', '230px', 'var(--wonder-lilac)', '-10deg'],
  ['90%', '8%', '154px', 'var(--wonder-lime)', '8deg'],
];

function BloomField({ progress }) {
  const reveal = clamp((progress - 0.08) / 0.42, 0, 1);
  const fade = 1 - clamp((progress - 0.8) / 0.2, 0, 1);
  return <div className="wonder-bloom-field" style={{ opacity: reveal * fade, transform: `translate3d(0, ${lerp(42, -8, progress)}px, 0) scale(${lerp(0.88, 1.08, progress)})` }} aria-hidden="true">{BLOOM_POSITIONS.map(([left, bottom, size, color, rotation], index) => <i key={index} style={{ '--bloom-left': left, '--bloom-bottom': bottom, '--bloom-size': size, '--bloom-color': color, '--bloom-rotation': rotation }} />)}</div>;
}

function WonderLayers({ progress, mouse, momentum }) {
  const earlyProgress = clamp(progress / 0.85, 0, 1);
  const mistOpacity = 0.55 * clamp((progress - 0.04) / 0.3, 0, 1) * (1 - clamp((progress - 0.82) / 0.18, 0, 1));
  const glowOpacity = clamp((progress - 0.02) / 0.32, 0, 1) * (1 - clamp((progress - 0.62) / 0.22, 0, 1)) * 0.9;
  const streakOpacity = momentum * 0.5 * (1 - clamp((progress - 0.86) / 0.14, 0, 1));
  return <>
    <div className="wonder-mist" aria-hidden="true" style={{ opacity: mistOpacity }}><i /><i /></div>
    <div className="wonder-portal-glow" aria-hidden="true" style={{ opacity: glowOpacity, transform: `translate3d(calc(-50% + ${mouse.x * 7}px), calc(-50% + ${mouse.y * 7}px), 0) scale(${lerp(0.82, 1.9, earlyProgress).toFixed(3)})` }} />
    <div className="wonder-streaks" aria-hidden="true" style={{ opacity: streakOpacity }}>{STREAKS.map((streak, index) => <i key={index} style={{ left: `${streak}%` }} />)}</div>
    <BloomField progress={progress} />
  </>;
}

export function WonderExperience() {
  const containerRef = useRef(null);
  const { progress, smoothProgress, momentum, mouse, isMobile, curtainsOpen, entranceDone, reduceMotion } = useWonderMotion(containerRef);
  const sceneOneOpacity = clamp(1 - progress / 0.22, 0, 1);
  const sceneTwoOpacity = clamp((progress - 0.68) / 0.16, 0, 1);
  const caveProgress = reduceMotion ? progress : smoothProgress;
  const motion = reduceMotion ? 0 : momentum;
  // 只为让后续卡片、文字保持足够对比度，克制压暗，避免把洞窟盖成一片黑
  const dim = reduceMotion ? 0.08 : 0.08 + 0.3 * clamp((progress - 0.14) / 0.44, 0, 1) * (1 - clamp((progress - 0.78) / 0.22, 0, 1));
  const vignette = 0.1 + 0.26 * clamp((progress - 0.12) / 0.42, 0, 1) * (1 - clamp((progress - 0.72) / 0.28, 0, 1));
  return (
    <section className="wonder-experience" ref={containerRef}>
      <div className="wonder-experience__viewport">
        <CavePortal progress={caveProgress} mouse={mouse} dimmed={dim} />
        <WonderLayers progress={progress} mouse={mouse} momentum={motion} />
        <div className="wonder-experience__fade" />
        <SceneOne opacity={sceneOneOpacity} visible={curtainsOpen} progress={progress} />
        <div className="wonder-arc-wrap" style={{ opacity: sceneTwoOpacity }}><ArcCardSlider progress={progress} isMobile={isMobile} /></div>
        <SceneTwo opacity={sceneTwoOpacity} progress={progress} />
        <Motes progress={progress} />
        <div className="wonder-experience__vignette" style={{ opacity: vignette }} />
        <div className="wonder-experience__top-fade" />
      </div>
    </section>
  );
}
