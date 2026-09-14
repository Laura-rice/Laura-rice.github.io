import { ActionLink } from '../ui/ActionLink';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectDeck } from './project-deck';

export function PracticeSection() {
  return <section className="section selected-section">
    <SectionHeading eyebrow="02 / SELECTED PRACTICE" title="把想法，做成实践。" intro="围绕数据质量、标注与模型评测的练习档案，记录方法、验证和复盘。" />
    <ProjectDeck />
    <ActionLink to="/projects" variant="secondary">查看全部实践</ActionLink>
  </section>;
}
