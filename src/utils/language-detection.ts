import type { Language } from '../contexts/language-context.js';

/**
 * Detects the user's preferred language from browser settings
 * and maps it to one of the supported languages.
 * @returns The detected language, or 'ja' as default if no supported language is detected
 */
export function detectBrowserLanguage(): Language {
  // Get browser languages in order of preference
  const browserLanguages = navigator.languages;

  const supportedLanguages = ['en', 'fr', 'ja'];
  for (const lang of browserLanguages) {
    // Extract the primary language code (e.g., 'en' from 'en-US')
    const primaryLang = lang.split('-')[0].toLowerCase();

    // Check if it matches any of our supported languages
    if (supportedLanguages.includes(primaryLang)) {
      return primaryLang as Language;
    }
  }

  // Default to Japanese if no supported language is found
  return 'ja';
}
