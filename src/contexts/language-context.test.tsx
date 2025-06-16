import { render, screen } from '@testing-library/react';
import { use } from 'react';
import { describe, expect, it, vi } from 'vitest';
import {
  type Language,
  LanguageContext,
  type LanguageContextType,
  useLanguageContext,
} from './language-context.js';

describe('LanguageContext', () => {
  it('should have undefined as default value', () => {
    let contextValue: LanguageContextType | undefined;
    function TestComponent() {
      contextValue = use(LanguageContext);
      return null;
    }
    render(<TestComponent />);
    expect(contextValue).toBeUndefined();
  });
});

describe('useLanguageContext', () => {
  function TestComponent() {
    useLanguageContext();
    return <div>Test</div>;
  }

  it('should throw error when used outside Provider', () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrowError('useLanguage must be used within a LanguageProvider');
  });

  it('should return context value when used inside Provider', () => {
    const mockContext: LanguageContextType = {
      language: 'en',
      setNextLanguage: vi.fn(),
      nextLanguage: vi.fn(() => 'ja' as Language),
      changeLanguage: vi.fn(),
    };

    function ConsumerComponent() {
      const ctx = useLanguageContext();
      return (
        <div>
          <span data-testid="lang">{ctx.language}</span>
          <button type="button" onClick={ctx.setNextLanguage}>
            Next
          </button>
        </div>
      );
    }

    render(
      <LanguageContext value={mockContext}>
        <ConsumerComponent />
      </LanguageContext>,
    );

    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('should call setNextLanguage when button is clicked', () => {
    const setNextLanguage = vi.fn();
    const mockContext: LanguageContextType = {
      language: 'ja',
      setNextLanguage,
      nextLanguage: vi.fn(() => 'en' as Language),
      changeLanguage: vi.fn(),
    };
    function ConsumerComponent() {
      const ctx = useLanguageContext();
      return (
        <button
          onClick={ctx.setNextLanguage}
          data-testid="set-next-language-btn"
          type="button"
        >
          Next
        </button>
      );
    }

    render(
      <LanguageContext value={mockContext}>
        <ConsumerComponent />
      </LanguageContext>,
    );

    screen.getByTestId('set-next-language-btn').click();
    expect(setNextLanguage).toHaveBeenCalled();
  });

  it('should call nextLanguage and changeLanguage', () => {
    const nextLanguage = vi.fn(() => 'fr' as Language);
    const changeLanguage = vi.fn();
    const mockContext: LanguageContextType = {
      language: 'fr',
      setNextLanguage: vi.fn(),
      nextLanguage,
      changeLanguage,
    };

    function ConsumerComponent() {
      const ctx = useLanguageContext();
      return (
        <div>
          <button
            onClick={() => ctx.nextLanguage()}
            data-testid="next-lang"
            type="button"
          >
            NextLang
          </button>
          <button
            onClick={() => {
              ctx.changeLanguage('en');
            }}
            data-testid="change-lang"
            type="button"
          >
            ChangeLang
          </button>
        </div>
      );
    }

    render(
      <LanguageContext value={mockContext}>
        <ConsumerComponent />
      </LanguageContext>,
    );

    screen.getByTestId('next-lang').click();
    expect(nextLanguage).toHaveBeenCalled();
    screen.getByTestId('change-lang').click();
    expect(changeLanguage).toHaveBeenCalledWith('en');
  });

  it('should return LanguageContextType shape', () => {
    const mockContext: LanguageContextType = {
      language: 'ja',
      setNextLanguage: vi.fn(),
      nextLanguage: vi.fn(() => 'en' as Language),
      changeLanguage: vi.fn(),
    };
    function ConsumerComponent() {
      const ctx = useLanguageContext();
      expect(typeof ctx.language).toBe('string');
      expect(typeof ctx.setNextLanguage).toBe('function');
      expect(typeof ctx.nextLanguage).toBe('function');
      expect(typeof ctx.changeLanguage).toBe('function');
      return null;
    }
    render(
      <LanguageContext value={mockContext}>
        <ConsumerComponent />
      </LanguageContext>,
    );
  });
});
