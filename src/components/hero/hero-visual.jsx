import { useRef, useState } from 'react';
import { MetalFallback } from './MetalFallback';

const CARD_LIMIT = 92;
const PORTRAIT_SRC = '/assets/yuan-portrait.jpg';

function clampOffset(value) {
  return Math.max(-CARD_LIMIT, Math.min(CARD_LIMIT, value));
}

function IdentityCard() {
  const dragRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, offset };
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    setOffset({
      x: clampOffset(dragRef.current.offset.x + event.clientX - dragRef.current.x),
      y: clampOffset(dragRef.current.offset.y + event.clientY - dragRef.current.y),
    });
  };

  const handlePointerUp = (event) => {
    if (dragRef.current) event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setOffset((current) => ({ x: current.x * 0.18, y: current.y * 0.18 }));
  };

  return (
    <div className="hero-id-wrap">
      <div className="hero-id-lanyard" aria-hidden="true"><span>YUAN / 01</span></div>
      <div
        className="hero-id-card"
        role="img"
        aria-label="米粒的 AI 训练师候选人身份卡，可拖拽"
        style={{ '--card-x': `${offset.x}px`, '--card-y': `${offset.y}px` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="hero-id-card__top"><span>AI TRAINER / CANDIDATE</span><span>NO. 026</span></div>
        <div className="hero-id-card__portrait"><img src={PORTRAIT_SRC} alt="米粒的头像" /></div>
        <div className="hero-id-card__bottom"><strong>米粒 / Miliiy</strong></div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return <div className="hero-art-stage" aria-label="米粒的身份卡视觉">
    <div className="hero-art-frame" aria-hidden="true"><span>FIG. 01 — A CURIOUS MIND</span><span>FORM IN PROGRESS</span></div>
    <IdentityCard />
    <MetalFallback />
  </div>;
}
