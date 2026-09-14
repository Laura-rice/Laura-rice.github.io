import { Link } from 'react-router-dom';
import { useSpotlight } from '../../hooks/useSpotlight';
import { ProjectDiagram } from './project-diagram';
export function ProjectCard({ project }) {
  const updateSpotlight = useSpotlight();
  return (
    <article className={`project-card project-card--${project.accent} reveal`} onPointerMove={updateSpotlight}>
      <div className="project-art" aria-hidden="true"><div className="project-art-label"><span>EXPLORATION / {project.index}</span><span>概念示意</span></div><ProjectDiagram index={project.index} /><b>{project.index}</b><i>DATA, MADE VISIBLE.</i></div>
      <div className="project-meta"><span className="tag">{project.status}</span><span>{project.contribution}</span></div>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <Link className="text-link card-detail-link" to={`/projects/${project.id}`}>查看实践详情 ↗</Link>
    </article>
  );
}
