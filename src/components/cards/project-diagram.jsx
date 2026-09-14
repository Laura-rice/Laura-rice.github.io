const GRID_POINTS = Array.from({ length: 64 }, (_, index) => index);
const WAVE_BARS = Array.from({ length: 35 }, (_, index) => ({ index, height: 18 + Math.abs(Math.sin(index * 0.49) * Math.cos(index * 0.18)) * 130 }));

/** Conceptual diagrams decorate practice covers; they do not claim measured results. */
export function ProjectDiagram({ index }) {
  return <div className={`project-diagram project-diagram--${index}`} aria-hidden="true">
    {index === '01' && <div className="data-matrix">{GRID_POINTS.map((point) => <i key={point} className={point % 9 === 0 ? 'is-highlight' : ''} style={{ '--cell-delay': `${point * 8}ms` }} />)}</div>}
    {index === '02' && <div className="annotation-map"><span>规则</span><span>边界</span><span>共识</span><i /></div>}
    {index === '03' && <div className="evaluation-wave">{WAVE_BARS.map((bar) => <i key={bar.index} style={{ '--bar-height': `${bar.height}px`, '--cell-delay': `${bar.index * 15}ms` }} />)}</div>}
  </div>;
}
