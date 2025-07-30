import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useThemeContext } from './theme-context';
import { useMemo, type ReactNode, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

interface Props {
  children: ReactNode;
}

export function MuiThemeProvider({ children }: Props) {
  const { theme } = useThemeContext();

  // Helper function to resolve auto theme to light or dark
  const getResolvedTheme = (currentTheme: string): 'light' | 'dark' => {
    if (currentTheme === 'auto') {
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        return 'dark';
      }
      return 'light';
    }
    return currentTheme as 'light' | 'dark';
  };

  const resolvedTheme = getResolvedTheme(theme);

  // Explicitly set data-mui-color-scheme on body for test compatibility
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-mui-color-scheme', resolvedTheme);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.removeAttribute('data-mui-color-scheme');
      }
    };
  }, [resolvedTheme]);

  // Explicitly cast theme to PaletteMode to avoid type error
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme,
          primary: {
            main: '#646cff',
          },
          secondary: {
            main: '#32ac21',
          },
        },
        typography: {
          fontFamily: [
            'Audiowide',
            'monospace',
            'Playwrite AU NSW',
            'system-ui',
            'Arial',
            'sans-serif',
          ].join(','),
        },
      }),
    [resolvedTheme],
  );

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
