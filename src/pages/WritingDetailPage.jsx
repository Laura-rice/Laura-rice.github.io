import { Link, useParams } from 'react-router-dom';
import { WRITINGS } from '../data/siteContent';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export function WritingDetailPage(){
  const {id}=useParams(); const article=WRITINGS.find(item=>item.id===id);
  useDocumentMeta(article?`${article.title} — 学习内容`:'内容不存在','AI 训练学习内容');
  if(!article)return <main className="not-found"><h1>没有找到这篇内容。</h1><Link to="/writing">返回学习内容 ↗</Link></main>;
  return <main className="page-main article-page"><header><span className="tag">{article.tag}</span><time>{article.date}</time><h1>{article.title}</h1><p>{article.excerpt}</p></header><article>{article.body.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<aside>关联能力 / 案例：<strong>{article.related}</strong></aside></article><Link className="article-back" to="/writing">← 返回全部内容</Link></main>;
}
