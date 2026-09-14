import { STRENGTHS } from '../../data/siteContent';
import { SectionHeading } from '../ui/SectionHeading';

export function GrowthSection() {
  return <section className="section strengths-section">
    <SectionHeading eyebrow="03 / WORK IN PROGRESS" title="保持未完成。" intro="当前围绕 AI 训练数据、模型评测与案例表达持续积累。" />
    <div className="strength-grid">{STRENGTHS.slice(0, 3).map(([index, title, text]) => <article className="strength-card reveal" key={index}>
      <span>{index}</span><h3>{title}</h3><p>{text}</p>
    </article>)}</div>
  </section>;
}
