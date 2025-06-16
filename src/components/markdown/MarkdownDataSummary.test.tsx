import { describe, it, expect } from 'vitest';

// Import the calculation functions by exporting them from the component
// For now, we'll test the calculation logic directly

describe('Markdown Data Summary Calculations', () => {
  const calculateColumnCount = (markdownOutput: string): number => {
    if (!markdownOutput.trim()) {
      return 0;
    }

    const lines = markdownOutput.trim().split('\n');
    const headerLine = lines.find((line) => line.trim().startsWith('|'));

    if (!headerLine) {
      return 0;
    }

    // Count the number of cells by splitting on | and excluding empty first/last parts
    const cells = headerLine.split('|').slice(1, -1);
    return cells.length;
  };

  const calculateRowCount = (markdownOutput: string): number => {
    if (!markdownOutput.trim()) {
      return 0;
    }

    const lines = markdownOutput.trim().split('\n');
    const tableLines = lines.filter((line) => line.trim().startsWith('|'));

    // Subtract 2 for header and separator line, return 0 if less than 2 lines total
    return Math.max(0, tableLines.length - 2);
  };

  it('should calculate column count correctly for a simple markdown table', () => {
    const markdownOutput = `| Name | Age | Job |
|------|-----|-----|
| John | 30  | Dev |
| Jane | 25  | Designer |`;

    expect(calculateColumnCount(markdownOutput)).toBe(3);
  });

  it('should calculate row count correctly for a simple markdown table', () => {
    const markdownOutput = `| Name | Age | Job |
|------|-----|-----|
| John | 30  | Dev |
| Jane | 25  | Designer |`;

    expect(calculateRowCount(markdownOutput)).toBe(2);
  });

  it('should handle empty markdown output', () => {
    expect(calculateColumnCount('')).toBe(0);
    expect(calculateRowCount('')).toBe(0);
  });

  it('should handle single header row only', () => {
    const markdownOutput = `| Name | Age |
|------|-----|`;

    expect(calculateColumnCount(markdownOutput)).toBe(2);
    expect(calculateRowCount(markdownOutput)).toBe(0);
  });

  it('should calculate character count correctly', () => {
    const markdownOutput = `| Name | Age |
|------|-----|
| John | 30  |`;

    expect(markdownOutput.length).toBe(44);
  });

  it('should calculate size correctly in KB', () => {
    const markdownOutput = 'A'.repeat(1024); // 1024 characters = 1 KB
    const sizeKB = (
      new TextEncoder().encode(markdownOutput).length / 1024
    ).toFixed(2);

    expect(sizeKB).toBe('1.00');
  });

  it('should handle markdown with different column counts on different rows', () => {
    const markdownOutput = `| Name | Age | Job |
|------|-----|-----|
| John | 30  |`;

    // Should still count based on header row
    expect(calculateColumnCount(markdownOutput)).toBe(3);
    expect(calculateRowCount(markdownOutput)).toBe(1);
  });
});
