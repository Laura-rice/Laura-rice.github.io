import { Link } from 'react-router-dom';
export function WritingCard({ article }) {
  return (
    <article className="writing-card reveal">
      <div><span className="tag">{article.tag}</span><time>{article.date}</time></div>
      <h3>{article.title}</h3><p>{article.excerpt}</p><Link className="text-link" to={`/writing/${article.id}`}>阅读笔记 ↗</Link>
    </article>
  );
}
