import { render, screen } from '@testing-library/react';
import { use } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  ThemeContext,
  useThemeContext,
  type ThemeContextType,
} from './theme-context';

// 1. デフォルト値が undefined であること

describe('ThemeContext', () => {
  it('should have undefined as default value', () => {
    let contextValue: ThemeContextType | undefined;
    function TestComponent() {
      contextValue = use(ThemeContext);
      return null;
    }
    render(<TestComponent />);
    expect(contextValue).toBeUndefined();
  });
});

describe('useThemeContext', () => {
  function TestComponent() {
    useThemeContext();
    return <div>Test</div>;
  }

  it('should throw error when used outside Provider', () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrowError('useTheme must be used within a ThemeProvider');
  });

  it('should return context value when used inside Provider', () => {
    const mockContext: ThemeContextType = {
      theme: 'light',
      toggleTheme: vi.fn(),
      setToLight: vi.fn(),
      setToDark: vi.fn(),
      setToAuto: vi.fn(),
    };
    function ConsumerComponent() {
      const ctx = useThemeContext();
      return (
        <div>
          <span data-testid="theme">{ctx.theme}</span>
          <button type="button" onClick={ctx.toggleTheme}>
            Toggle
          </button>
        </div>
      );
    }
    render(
      <ThemeContext value={mockContext}>
        <ConsumerComponent />
      </ThemeContext>,
    );
    expect(screen.getByTestId('theme').textContent).toBe('light');
  });

  it('should call toggleTheme, setToLight, setToDark, setToAuto', () => {
    const toggleTheme = vi.fn();
    const setToLight = vi.fn();
    const setToDark = vi.fn();
    const setToAuto = vi.fn();
    const mockContext: ThemeContextType = {
      theme: 'dark',
      toggleTheme,
      setToLight,
      setToDark,
      setToAuto,
    };
    function ConsumerComponent() {
      const ctx = useThemeContext();
      return (
        <div>
          <button type="button" onClick={ctx.toggleTheme} data-testid="toggle">
            Toggle
          </button>
          <button type="button" onClick={ctx.setToLight} data-testid="light">
            Light
          </button>
          <button type="button" onClick={ctx.setToDark} data-testid="dark">
            Dark
          </button>
          <button type="button" onClick={ctx.setToAuto} data-testid="auto">
            Auto
          </button>
        </div>
      );
    }
    render(
      <ThemeContext value={mockContext}>
        <ConsumerComponent />
      </ThemeContext>,
    );
    screen.getByTestId('toggle').click();
    expect(toggleTheme).toHaveBeenCalled();
    screen.getByTestId('light').click();
    expect(setToLight).toHaveBeenCalled();
    screen.getByTestId('dark').click();
    expect(setToDark).toHaveBeenCalled();
    screen.getByTestId('auto').click();
    expect(setToAuto).toHaveBeenCalled();
  });

  it('should return ThemeContextType shape', () => {
    const mockContext: ThemeContextType = {
      theme: 'auto',
      toggleTheme: vi.fn(),
      setToLight: vi.fn(),
      setToDark: vi.fn(),
      setToAuto: vi.fn(),
    };
    function ConsumerComponent() {
      const ctx = useThemeContext();
      expect(typeof ctx.theme).toBe('string');
      expect(typeof ctx.toggleTheme).toBe('function');
      expect(typeof ctx.setToLight).toBe('function');
      expect(typeof ctx.setToDark).toBe('function');
      expect(typeof ctx.setToAuto).toBe('function');
      return null;
    }
    render(
      <ThemeContext value={mockContext}>
        <ConsumerComponent />
      </ThemeContext>,
    );
  });
});
