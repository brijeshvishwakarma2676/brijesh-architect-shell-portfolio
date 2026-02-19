import { useEffect } from 'react';

/**
 * useDarkMode - Ensures light mode is always active.
 * Kept as a stub in case any component still imports it.
 */
export function useDarkMode() {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  return { isDark: false, toggle: () => {} };
}
