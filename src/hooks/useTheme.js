import { useEffect, useState } from 'react';

const STORAGE_KEY = 'yuan-portfolio-metal-theme';

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);
  return { theme, toggleTheme: () => setTheme((value) => value === 'dark' ? 'light' : 'dark') };
}
