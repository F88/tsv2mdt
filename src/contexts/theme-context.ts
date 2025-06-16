import { createContext, use } from 'react';

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setToLight: () => void;
  setToDark: () => void;
  setToAuto: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export function useThemeContext(): ThemeContextType {
  const context: ThemeContextType | undefined = use(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
