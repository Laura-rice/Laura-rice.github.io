import { clamp, lerp } from '../../hooks/use-wonder-motion';

/**
 * 水晶洞窟：纯 SVG + CSS 绘制，不依赖任何外部图片。
 * 外层不规则岩壁（含钟乳石尖齿）作画框，内部透出明亮天光与云层。
 */

const CAVE_HOLE = 'M-60 980L40 840L6 700L96 596L34 486L112 388L64 300L88 236L120 300L168 196L232 268L286 172L352 246L420 160L492 240L560 158L630 236L700 152L776 238L846 156L920 240L992 150L1064 232L1136 158L1188 240L1268 148L1330 224L1380 300L1352 396L1424 496L1360 600L1442 700L1396 812L1470 980Z';

const CAVE_FRAME = `M0 0H1440V900H0Z ${CAVE_HOLE}`;

const FACETS = [
  'M300 0L346 158',
  'M612 0L592 146',
  'M950 0L986 166',
  'M1268 0L1226 138',
  'M0 320L74 356',
  'M0 640L62 676',
  'M1440 300L1372 344',
  'M1440 660L1384 702',
];

// 悬挂 / 竖出的水晶碎片（三角面）
const SHARDS = [
  [150, 254, 188, 384, 226, 262],
  [248, 292, 272, 414, 304, 278],
  [1118, 248, 1152, 380, 1188, 256],
  [1216, 292, 1244, 408, 1272, 280],
  [894, 172, 926, 282, 958, 176],
  [62, 452, 122, 472, 66, 560],
  [1384, 436, 1326, 458, 1380, 546],
];

const CLOUDS = [
  ['6%', '50%', '44%', '19%', 'rgba(255,255,255,.80)', '64s', '0s'],
  ['48%', '44%', '40%', '17%', 'rgba(255,244,250,.72)', '82s', '-14s'],
  ['22%', '60%', '36%', '15%', 'rgba(243,205,232,.68)', '71s', '-30s'],
  ['62%', '58%', '34%', '14%', 'rgba(214,226,255,.62)', '94s', '-46s'],
];

export function CavePortal({ progress = 0, mouse = { x: 0, y: 0 }, dimmed = 0 }) {
  const drift = clamp(progress / 0.55, 0, 1);
  const sky = `translate3d(${(mouse.x * 5).toFixed(2)}px, ${(mouse.y * 5).toFixed(2)}px, 0) scale(${lerp(1, 1.14, drift).toFixed(3)})`;
  const cloud = `translate3d(${(mouse.x * 10).toFixed(2)}px, ${(mouse.y * 6).toFixed(2)}px, 0) scale(${lerp(1, 1.24, drift).toFixed(3)})`;
  const rock = `translate3d(${(mouse.x * 3).toFixed(2)}px, ${(mouse.y * 3).toFixed(2)}px, 0) scale(${lerp(1, 1.07, drift).toFixed(3)})`;

  return (
    <div className="wonder-cave" aria-hidden="true">
      <div className="wonder-cave__sky" style={{ transform: sky }} />
      <div className="wonder-cave__sun" style={{ opacity: lerp(0.55, 1, drift).toFixed(3) }} />
      <div className="wonder-cave__clouds" style={{ transform: cloud }}>
        {CLOUDS.map(([left, top, width, height, color, duration, delay], index) => (
          <i key={index} style={{ left, top, width, height, background: color, animationDuration: duration, animationDelay: delay }} />
        ))}
      </div>
      <div className="wonder-cave__horizon" />
      <div className="wonder-cave__bloom" style={{ opacity: lerp(0.42, 0.82, drift).toFixed(3) }} />
      <svg className="wonder-cave__rock" viewBox="0 0 1440 900" preserveAspectRatio="none" style={{ transform: rock }}>
        <defs>
          <linearGradient id="wonderCaveRock" x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="#241040" />
            <stop offset="42%" stopColor="#2c1250" />
            <stop offset="100%" stopColor="#120822" />
          </linearGradient>
          <linearGradient id="wonderCaveRim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(214,190,255,.62)" />
            <stop offset="55%" stopColor="rgba(168,138,236,.28)" />
            <stop offset="100%" stopColor="rgba(120,96,196,.05)" />
          </linearGradient>
          <linearGradient id="wonderCaveShard" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="rgba(238,228,255,.88)" />
            <stop offset="58%" stopColor="rgba(186,158,246,.42)" />
            <stop offset="100%" stopColor="rgba(132,102,214,.12)" />
          </linearGradient>
        </defs>
        <path d={CAVE_FRAME} fillRule="evenodd" fill="url(#wonderCaveRock)" />
        <g className="wonder-cave__facets">
          {FACETS.map((facet, index) => <path key={index} d={facet} />)}
        </g>
        <g className="wonder-cave__shards">
          {SHARDS.map((shard, index) => <polygon key={index} points={shard.join(' ')} style={{ animationDelay: `${(-index * 1.7).toFixed(1)}s` }} />)}
        </g>
        <path className="wonder-cave__rim" d={CAVE_HOLE} fill="none" stroke="url(#wonderCaveRim)" strokeWidth="5" />
      </svg>
      <div className="wonder-cave__floor" />
      <div className="wonder-cave__dim" style={{ opacity: dimmed.toFixed(3) }} />
    </div>
  );
}
