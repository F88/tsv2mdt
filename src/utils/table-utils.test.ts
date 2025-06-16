import { describe, expect, it } from 'vitest';
import type { DelimiterRow } from 'x2md';
import {
  type ColumnAlignment,
  createDelimiterFromAlignments,
} from './table-utils.js';

describe('createDelimiterFromAlignments', () => {
  it('creates a DelimiterRow with correct alignments', () => {
    const alignments: ColumnAlignment[] = [
      'left',
      'center',
      'right',
      undefined,
    ];
    const delimiterRow: DelimiterRow =
      createDelimiterFromAlignments(alignments);
    expect(delimiterRow).toHaveLength(4);
    expect(delimiterRow[0].alignment).toBe('left');
    expect(delimiterRow[1].alignment).toBe('center');
    expect(delimiterRow[2].alignment).toBe('right');
    expect(delimiterRow[3].alignment).toBeUndefined();
  });

  it('returns an empty array for empty input', () => {
    const delimiterRow = createDelimiterFromAlignments([]);
    expect(Array.isArray(delimiterRow)).toBe(true);
    expect(delimiterRow).toHaveLength(0);
  });

  it('handles all undefined alignments', () => {
    const delimiterRow = createDelimiterFromAlignments([undefined, undefined]);
    expect(delimiterRow).toHaveLength(2);
    expect(delimiterRow[0].alignment).toBeUndefined();
    expect(delimiterRow[1].alignment).toBeUndefined();
  });
});
