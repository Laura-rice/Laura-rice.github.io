import { WRITINGS } from '../../data/siteContent';
import { WritingCard } from '../cards/WritingCard';
import { ActionLink } from '../ui/ActionLink';
import { SectionHeading } from '../ui/SectionHeading';

export function WritingSection() {
  return <section className="section journal-section">
    <SectionHeading eyebrow="04 / NOTES & THOUGHTS" title="一些思考的切片。" intro="把学到的东西，变成自己的判断。" />
    <div className="writing-list">{WRITINGS.map((article) => <WritingCard key={article.id} article={article} />)}</div>
    <ActionLink to="/writing" variant="secondary">查看全部内容</ActionLink>
  </section>;
}
