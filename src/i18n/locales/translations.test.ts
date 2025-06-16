import { describe, it, expect } from 'vitest';
import enTranslations from './en.json';
import jaTranslations from './ja.json';
import frTranslations from './fr.json';

describe('Translation Files', () => {
  it('should have all required keys in English translations', () => {
    const requiredKeys = [
      'title',
      'description',
      'loadSample',
      'clearAll',
      'tsvInput',
      'tsvPlaceholder',
      'markdownOutput',
      'htmlPreview',
    ];

    requiredKeys.forEach((key) => {
      expect(enTranslations).toHaveProperty(key);
      expect(typeof enTranslations[key as keyof typeof enTranslations]).toBe(
        'string',
      );
    });

    // Check error messages structure
    expect(enTranslations.errors).toHaveProperty('markdownGenerationFailed');
    expect(typeof enTranslations.errors.markdownGenerationFailed).toBe(
      'string',
    );

    // Check language tooltips structure
    // expect(enTranslations.languageTooltips).toHaveProperty('switchToEnglish');
    // expect(enTranslations.languageTooltips).toHaveProperty('switchToFrench');
    // expect(enTranslations.languageTooltips).toHaveProperty('switchToJapanese');
    // expect(typeof enTranslations.languageButton.switchToEnglish).toBe('string');
    // expect(typeof enTranslations.languageButton.switchToFrench).toBe('string');
    // expect(typeof enTranslations.languageButton.switchToJapanese).toBe('string');
    assertLanguageTooltipsStructure(enTranslations.languageButton);
  });

  function assertLanguageTooltipsStructure(tooltips: Record<string, string>) {
    const tooltipKeys = [
      'switchToEnglish',
      'switchToFrench',
      'switchToJapanese',
    ];

    tooltipKeys.forEach((key) => {
      expect(tooltips).toHaveProperty(key);
      expect(typeof tooltips[key]).toBe('string');
    });
  }

  it('should have all required keys in Japanese translations', () => {
    const requiredKeys = [
      'title',
      'description',
      'loadSample',
      'clearAll',
      'tsvInput',
      'tsvPlaceholder',
      'markdownOutput',
      'htmlPreview',
    ];

    requiredKeys.forEach((key) => {
      expect(jaTranslations).toHaveProperty(key);
      expect(typeof jaTranslations[key as keyof typeof jaTranslations]).toBe(
        'string',
      );
    });

    // Check error messages structure
    expect(jaTranslations.errors).toHaveProperty('markdownGenerationFailed');
    expect(typeof jaTranslations.errors.markdownGenerationFailed).toBe(
      'string',
    );

    // Check language tooltips structure
    expect(jaTranslations.languageButton).toHaveProperty('switchToEnglish');
    expect(jaTranslations.languageButton).toHaveProperty('switchToFrench');
    expect(jaTranslations.languageButton).toHaveProperty('switchToJapanese');
    expect(typeof jaTranslations.languageButton.switchToEnglish).toBe('string');
    expect(typeof jaTranslations.languageButton.switchToFrench).toBe('string');
    expect(typeof jaTranslations.languageButton.switchToJapanese).toBe(
      'string',
    );
  });

  it('should have all required keys in French translations', () => {
    const requiredKeys = [
      'title',
      'description',
      'loadSample',
      'clearAll',
      'tsvInput',
      'tsvPlaceholder',
      'markdownOutput',
      'htmlPreview',
    ];

    requiredKeys.forEach((key) => {
      expect(frTranslations).toHaveProperty(key);
      expect(typeof frTranslations[key as keyof typeof frTranslations]).toBe(
        'string',
      );
    });

    // Check error messages structure
    expect(frTranslations.errors).toHaveProperty('markdownGenerationFailed');
    expect(typeof frTranslations.errors.markdownGenerationFailed).toBe(
      'string',
    );

    // Check language tooltips structure
    expect(frTranslations.languageButton).toHaveProperty('switchToEnglish');
    expect(frTranslations.languageButton).toHaveProperty('switchToFrench');
    expect(frTranslations.languageButton).toHaveProperty('switchToJapanese');
    expect(typeof frTranslations.languageButton.switchToEnglish).toBe('string');
    expect(typeof frTranslations.languageButton.switchToFrench).toBe('string');
    expect(typeof frTranslations.languageButton.switchToJapanese).toBe(
      'string',
    );
  });

  it('should have consistent structure between languages', () => {
    const enKeys = Object.keys(enTranslations);
    const jaKeys = Object.keys(jaTranslations);
    const frKeys = Object.keys(frTranslations);

    expect(enKeys.sort()).toEqual(jaKeys.sort());
    expect(enKeys.sort()).toEqual(frKeys.sort());
  });
});
