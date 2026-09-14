import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from '../components/layout/SiteLayout';
import { AboutPage } from '../pages/AboutPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { WritingPage } from '../pages/WritingPage';
import { PracticeDetailPage } from '../pages/PracticeDetailPage';
import { WritingDetailPage } from '../pages/WritingDetailPage';

export function App() {
  return (
    <>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<PracticeDetailPage />} />
          <Route path="writing" element={<WritingPage />} />
          <Route path="writing/:id" element={<WritingDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
