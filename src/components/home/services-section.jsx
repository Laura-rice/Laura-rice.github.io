import { useState } from 'react';

const SERVICE_STAGES = [
  ['01', 'AUDIT', '先看数据，再谈效果。检查重复、泄漏、格式、覆盖与答案质量，让问题拥有清晰的入口。'],
  ['02', 'ANNOTATE', '把模糊判断写成规则、正反例和边界案例，让不同的人能够稳定执行同一套标准。'],
  ['03', 'EVALUATE', '从错误样本切片定位原因，区分数据、训练和模型因素，并保留下一轮验证的依据。'],
  ['04', 'COMMUNICATE', '把过程、结论、局限和下一步讲清楚，让一份分析能被复查、转交和继续使用。'],
];

export function ServicesSection() {
  const [activeStage, setActiveStage] = useState(0);
  return (
    <section className="services-section section" id="services">
      <div className="section-heading"><p className="eyebrow">04 / HOW I WORK</p><div><h2>让复杂，<span>变得可执行。</span></h2><p className="section-intro">从发现问题到留下验证，每一步都尽量让判断有标准、过程有记录、结果能复盘。</p></div></div>
      <div className="services-list">
        {SERVICE_STAGES.map(([index, title, text], itemIndex) => {
          const isActive = itemIndex === activeStage;
          return <article className={`service-item${isActive ? ' is-active' : ''}`} key={index}>
            <button type="button" onClick={() => setActiveStage(isActive ? -1 : itemIndex)} aria-expanded={isActive}>
              <span>{index}</span><strong>{title}</strong><i aria-hidden="true">{isActive ? '−' : '+'}</i>
            </button>
            <div className="service-item__body"><p>{text}</p></div>
          </article>;
        })}
      </div>
    </section>
  );
}
