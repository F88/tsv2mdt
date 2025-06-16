import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import { ThemeContext } from './theme-context';
import type { Theme, ThemeContextType } from './theme-context';

interface Props {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (
      savedTheme === 'light' ||
      savedTheme === 'dark' ||
      savedTheme === 'auto'
    ) {
      return savedTheme;
    }
    // Default to auto theme for first-time users
    return 'auto';
  });

  // Helper function to get the actual theme to apply (resolves 'auto' to 'light' or 'dark')
  const getResolvedTheme = useCallback(
    (currentTheme: Theme): 'light' | 'dark' => {
      if (currentTheme === 'auto') {
        if (
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          return 'dark';
        }
        return 'light';
      }
      return currentTheme;
    },
    [],
  );

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const setToLight = useCallback(() => {
    setTheme('light');
  }, []);

  const setToDark = useCallback(() => {
    setTheme('dark');
  }, []);

  const setToAuto = useCallback(() => {
    setTheme('auto');
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const resolvedTheme = getResolvedTheme(theme);
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [theme, getResolvedTheme]);

  // Listen for system theme changes when in auto mode
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const resolvedTheme = getResolvedTheme(theme);
      document.documentElement.setAttribute('data-theme', resolvedTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, getResolvedTheme]);

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme,
      toggleTheme,
      setToLight,
      setToDark,
      setToAuto,
    }),
    [setToDark, setToLight, setToAuto, theme, toggleTheme],
  );

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
}
