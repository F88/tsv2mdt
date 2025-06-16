import { act, cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useThemeContext } from './theme-context.js';
import { ThemeContextProvider } from './ThemeContextProvider.jsx';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
const mockMatchMedia = vi.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

// Test component that uses the theme context
function TestComponent() {
  const { theme, setToLight, setToDark, setToAuto } = useThemeContext();

  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <button type="button" onClick={setToLight} data-testid="light-button">
        Light
      </button>
      <button type="button" onClick={setToDark} data-testid="dark-button">
        Dark
      </button>
      <button type="button" onClick={setToAuto} data-testid="auto-button">
        Auto
      </button>
    </div>
  );
}

describe('ThemeContextProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('should default to auto theme when no localStorage value exists', () => {
    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('auto');
  });

  it('should load saved theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('should allow setting theme to light', async () => {
    const user = userEvent.setup();

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );

    await act(async () => {
      await user.click(screen.getByTestId('light-button'));
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should allow setting theme to dark', async () => {
    const user = userEvent.setup();

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );

    await act(async () => {
      await user.click(screen.getByTestId('dark-button'));
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should allow setting theme to auto', async () => {
    const user = userEvent.setup();

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );

    await act(async () => {
      await user.click(screen.getByTestId('auto-button'));
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('auto');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'auto');
  });

  it('should recognize valid saved theme values including auto', () => {
    localStorageMock.getItem.mockReturnValue('auto');

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('auto');
  });

  it('should apply dark theme when system prefers dark and theme is auto', () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    localStorageMock.getItem.mockReturnValue('auto');

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('auto');
    // The resolved theme should be applied to the document element
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('should apply light theme when system prefers light and theme is auto', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    localStorageMock.getItem.mockReturnValue('auto');

    render(
      <ThemeContextProvider>
        <TestComponent />
      </ThemeContextProvider>,
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('auto');
    // The resolved theme should be applied to the document element
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});
