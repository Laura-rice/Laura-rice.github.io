import { Hero } from '../components/hero/Hero';
import { HomeSections } from '../components/home/home-sections';
import { SEO } from '../app/seo';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useReveal } from '../hooks/useReveal';

export function HomePage() {
  useDocumentMeta(...SEO.home); useReveal();
  return <main><Hero /><HomeSections /></main>;
}
