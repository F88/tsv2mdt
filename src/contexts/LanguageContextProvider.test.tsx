import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLanguageContext } from './language-context.js';
import { LanguageContextProvider } from './LanguageContextProvider.jsx';

// Mock i18n to avoid initialization issues
vi.mock('../i18n', () => ({
  default: {
    changeLanguage: vi.fn().mockResolvedValue(undefined),
  },
}));

// Test component to access the language context
function TestComponent() {
  const { language } = useLanguageContext();
  return <div data-testid="language">{language}</div>;
}

describe('LanguageContextProvider', () => {
  const originalLanguages = navigator.languages;

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

  beforeEach(() => {
    // Reset all localStorage mocks before each test
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up rendered components
    cleanup();

    // Restore original navigator.languages
    Object.defineProperty(navigator, 'languages', {
      value: originalLanguages,
      configurable: true,
    });

    // Clear all mocks
    vi.clearAllMocks();
  });

  it('should use saved language from localStorage when available', () => {
    localStorageMock.getItem.mockReturnValue('en');

    const { getByTestId } = render(
      <LanguageContextProvider>
        <TestComponent />
      </LanguageContextProvider>,
    );

    expect(getByTestId('language')).toHaveTextContent('en');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language');
  });

  it('should use browser language detection when localStorage is empty', () => {
    localStorageMock.getItem.mockReturnValue(null);
    Object.defineProperty(navigator, 'languages', {
      value: ['fr-FR', 'en-US'],
      configurable: true,
    });

    const { getByTestId } = render(
      <LanguageContextProvider>
        <TestComponent />
      </LanguageContextProvider>,
    );

    expect(getByTestId('language')).toHaveTextContent('fr');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language');
  });

  it('should default to Japanese when localStorage is empty and no supported browser language', () => {
    localStorageMock.getItem.mockReturnValue(null);
    Object.defineProperty(navigator, 'languages', {
      value: ['de-DE', 'es-ES'],
      configurable: true,
    });

    const { getByTestId } = render(
      <LanguageContextProvider>
        <TestComponent />
      </LanguageContextProvider>,
    );

    expect(getByTestId('language')).toHaveTextContent('ja');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language');
  });

  it('should ignore invalid saved language and use browser detection', () => {
    localStorageMock.getItem.mockReturnValue('invalid-lang');
    Object.defineProperty(navigator, 'languages', {
      value: ['en-US'],
      configurable: true,
    });

    const { getByTestId } = render(
      <LanguageContextProvider>
        <TestComponent />
      </LanguageContextProvider>,
    );

    expect(getByTestId('language')).toHaveTextContent('en');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('language');
  });
});
