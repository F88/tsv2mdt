import { afterEach, describe, expect, it, vi } from 'vitest';
import { detectBrowserLanguage } from './language-detection.js';

describe('Language Detection', () => {
  // Store original navigator.languages
  const originalLanguages = navigator.languages;

  afterEach(() => {
    // Restore original navigator.languages
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'languages', {
      value: originalLanguages,
      configurable: true,
    });
  });

  it('should detect English when browser language is en-US', () => {
    Object.defineProperty(navigator, 'languages', {
      value: ['en-US', 'en'],
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe('en');
  });

  it('should detect Japanese when browser language is ja', () => {
    Object.defineProperty(navigator, 'languages', {
      value: ['ja', 'en'],
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe('ja');
  });

  it('should detect French when browser language is fr-FR', () => {
    Object.defineProperty(navigator, 'languages', {
      value: ['fr-FR', 'fr'],
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe('fr');
  });

  it('should pick the first supported language from multiple preferences', () => {
    Object.defineProperty(navigator, 'languages', {
      value: ['de-DE', 'fr-CA', 'en-US'],
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe('fr');
  });

  it('should default to Japanese when no supported languages are found', () => {
    Object.defineProperty(navigator, 'languages', {
      value: ['de-DE', 'es-ES', 'it-IT'],
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe('ja');
  });

  it('should handle case-insensitive language codes', () => {
    Object.defineProperty(navigator, 'languages', {
      value: ['EN-US', 'FR-CA'],
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe('en');
  });

  it('should handle empty languages array', () => {
    Object.defineProperty(navigator, 'languages', {
      value: [],
      configurable: true,
    });

    expect(detectBrowserLanguage()).toBe('ja');
  });
});
