import { Link, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/siteContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const SECTIONS = [['问题与目标','problem'],['输入数据','input'],['我的工作','work'],['方法与判断依据','method'],['输出结果','output'],['验证方式','verification'],['复盘与改进','reflection']];

export function PracticeDetailPage(){
  const {id}=useParams(); const project=PROJECTS.find(item=>item.id===id);
  useDocumentMeta(project?`${project.title} — 能力实践`:'实践不存在','AI 训练能力实践详情');
  if(!project)return <main className="not-found"><h1>没有找到这项实践。</h1><Link to="/projects">返回能力实践 ↗</Link></main>;
  return <main className="page-main detail-page"><header className="detail-hero"><span>{project.index} / {project.status}</span><h1>{project.title}</h1><p>{project.summary}</p></header><div className="detail-layout"><aside><p>可以证明的能力</p>{project.evidence.map(item=><span className="tag" key={item}>{item}</span>)}</aside><article>{SECTIONS.map(([title,key])=><section key={key}><h2>{title}</h2><p>{project.detail[key]}</p></section>)}</article></div><div className="detail-back"><Link to="/projects">← 返回全部实践</Link></div></main>;
}
