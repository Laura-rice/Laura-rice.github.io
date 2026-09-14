import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../data/siteContent';
import { ProjectDiagram } from '../cards/project-diagram';

function getCardPosition(index, activeIndex) {
  const distance = (index - activeIndex + PROJECTS.length) % PROJECTS.length;
  return { distance, isActive: distance === 0 };
}

export function ProjectDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = PROJECTS[activeIndex];

  return (
    <div className="project-deck">
      <div className="project-deck__stage" aria-label="能力实践卡片组">
        {PROJECTS.map((project, index) => {
          const { distance, isActive } = getCardPosition(index, activeIndex);
          return (
            <button
              className={`project-deck__card${isActive ? ' is-active' : ''}`}
              key={project.id}
              type="button"
              style={{ '--deck-distance': distance, '--deck-order': PROJECTS.length - distance }}
              onClick={() => setActiveIndex(index)}
              aria-label={`查看${project.title}`}
            >
              <span className="project-deck__eyebrow">{project.index} / {project.status}</span>
              <div className="project-deck__art"><ProjectDiagram index={project.index} /><b>{project.index}</b></div>
              <span className="project-deck__title">{project.title}</span>
            </button>
          );
        })}
        <div className="project-deck__dots" aria-label="选择实践项目">
          {PROJECTS.map((project, index) => <button key={project.id} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => setActiveIndex(index)} aria-label={`选择${project.title}`} />)}
        </div>
      </div>
      <div className="project-deck__detail" aria-live="polite">
        <p className="eyebrow">{activeProject.status} / {activeProject.contribution}</p>
        <h3>{activeProject.title}</h3>
        <p>{activeProject.summary}</p>
        <div className="project-deck__tags">{activeProject.evidence.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
        <Link className="action-link action-link--secondary" to={`/projects/${activeProject.id}`}>探索实践 <span>↗</span></Link>
      </div>
    </div>
  );
}
