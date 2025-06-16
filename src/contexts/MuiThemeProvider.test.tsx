import { cleanup, render, screen } from '@testing-library/react';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  type Mock,
  vi,
} from 'vitest';
import { MuiThemeProvider } from './MuiThemeProvider.jsx';
import { useThemeContext } from './theme-context.js';

vi.mock('./theme-context', () => ({
  useThemeContext: vi.fn(),
}));

describe('MuiThemeProvider', () => {
  const TestComponent = () => <div data-testid="test-child">Test Child</div>;

  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders children', () => {
    (useThemeContext as Mock).mockReturnValue({
      theme: 'light',
    });
    render(
      <MuiThemeProvider>
        <TestComponent />
      </MuiThemeProvider>,
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('applies light theme when theme is light', () => {
    (useThemeContext as Mock).mockReturnValue({
      theme: 'light',
    });
    render(
      <MuiThemeProvider>
        <TestComponent />
      </MuiThemeProvider>,
    );
    // MUI sets data-mui-color-scheme on the body
    expect(document.body.getAttribute('data-mui-color-scheme')).toBe('light');
  });

  it('applies dark theme when theme is dark', () => {
    (useThemeContext as Mock).mockReturnValue({
      theme: 'dark',
    });
    render(
      <MuiThemeProvider>
        <TestComponent />
      </MuiThemeProvider>,
    );
    expect(document.body.getAttribute('data-mui-color-scheme')).toBe('dark');
  });

  it('resolves auto theme to dark if prefers-color-scheme: dark', () => {
    (useThemeContext as Mock).mockReturnValue({
      theme: 'auto',
    });
    const matchMediaMock = vi.fn().mockReturnValue({ matches: true });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
    render(
      <MuiThemeProvider>
        <TestComponent />
      </MuiThemeProvider>,
    );
    expect(document.body.getAttribute('data-mui-color-scheme')).toBe('dark');
  });

  it('resolves auto theme to light if prefers-color-scheme: light', () => {
    (useThemeContext as Mock).mockReturnValue({
      theme: 'auto',
    });
    const matchMediaMock = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
    render(
      <MuiThemeProvider>
        <TestComponent />
      </MuiThemeProvider>,
    );
    expect(document.body.getAttribute('data-mui-color-scheme')).toBe('light');
  });

  afterEach(() => {
    cleanup();
  });
});
