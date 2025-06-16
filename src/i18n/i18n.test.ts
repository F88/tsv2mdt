import { describe, it, expect, beforeEach } from 'vitest';
import i18n from './index';

describe('i18n Configuration', () => {
  beforeEach(async () => {
    // Reset to default language before each test
    await i18n.changeLanguage('ja');
  });

  it('should have Japanese as default language', () => {
    expect(i18n.language).toBe('ja');
  });

  it('should switch to English and translate correctly', async () => {
    await i18n.changeLanguage('en');
    expect(i18n.language).toBe('en');
    expect(i18n.t('title')).toBe('TSV to Markdown Table');
    expect(i18n.t('loadSample')).toBe('Sample data');
  });

  it('should have Japanese translations', async () => {
    await i18n.changeLanguage('ja');
    expect(i18n.language).toBe('ja');
    expect(i18n.t('description')).toBe(
      'TSVデータを貼り付けて、Markdownテーブル形式に変換します',
    );
    expect(i18n.t('loadSample')).toBe('サンプルデータ');
  });

  it('should fallback to English for missing keys', async () => {
    await i18n.changeLanguage('ja');
    // Test with a key that doesn't exist
    expect(i18n.t('nonexistent.key')).toBe('nonexistent.key');
  });
});
