import { describe, it, expect } from 'vitest';
import { ExampleData } from './sample-data';

// Helper to check if a string is TSV (at least one tab per line, header present)
function isTsvFormat(str: string): boolean {
  const lines = str.split('\n');
  if (lines.length < 2) return false;
  // Header and at least one data row
  return lines.every((line) => line.includes('\t'));
}

describe('sample-data.ts', () => {
  it('should export all expected samples as non-empty strings', () => {
    ExampleData.forEach((value) => {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    });
  });

  it('should have TSV format for all samples', () => {
    ExampleData.forEach((value) => {
      expect(isTsvFormat(value)).toBe(true);
    });
  });
});
