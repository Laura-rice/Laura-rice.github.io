const EVIDENCE = [
  { index: '01', title: '从细节里，发现问题。', label: 'DATA QUALITY', text: '从重复、泄漏到任务覆盖，用数据检查清单找到容易被忽略的信号。', href: '/projects/quality-map' },
  { index: '02', title: '让模糊，变得清晰。', label: 'ANNOTATION SYSTEMS', text: '通过规则、正反例与边界案例，把主观判断转成能够共同执行的标准。', href: '/projects/annotation-rules' },
  { index: '03', title: '让每次尝试，留下答案。', label: 'EVALUATION & REFLECTION', text: '拆解模型错误、区分原因，再用独立样本验证下一次改进。', href: '/projects/evaluation-slices' },
];

import { Link } from 'react-router-dom';

export function IntroductionSection() {
  return <section className="introduction-section section" id="introduction">
    <div className="manifesto">
      <p className="eyebrow reveal">01 / A LITTLE ABOUT ME</p>
      <h2 className="reveal">有条理地思考。<br /><span>有感知地创造。</span></h2>
      <div className="manifesto-note reveal"><span className="note-star" aria-hidden="true">✳</span><p>数据科学与大数据技术专业学生，<br />正在走向 AI 训练师的第一站。<br />喜欢把问题想清楚，也把想法表达好。</p></div>
    </div>
    <div className="evidence-layout">
      <div className="evidence-aside"><p className="eyebrow">60 秒了解我</p><h3>认真，<br />有迹可循。</h3><p>三个关键词。<br />也是我做事的方式。</p><span className="evidence-mark" aria-hidden="true">m.</span></div>
      <div className="evidence-list">{EVIDENCE.map((item) => <article className="evidence-item reveal" key={item.index}>
        <div className="evidence-label"><span>{item.index}</span><span>{item.label}</span></div>
        <h3>{item.title}</h3><p>{item.text}</p><Link className="text-link" to={item.href}>查看能力实践 <span aria-hidden="true">↗</span></Link>
      </article>)}</div>
    </div>
  </section>;
}
