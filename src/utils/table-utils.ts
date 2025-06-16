/**
 * Table utilities for creating markdown tables with configurable column attributes
 */

import type { DelimiterCell, DelimiterRow } from 'x2md';

/**
 * Column alignment options for markdown tables
 */
export type ColumnAlignment = DelimiterCell['alignment'];

/**
 * Creates a DelimiterRow from an array of alignment strings
 * @param alignments - Array of alignment strings
 * @returns DelimiterRow configuration
 */
export function createDelimiterFromAlignments(
  alignments: ColumnAlignment[],
): DelimiterRow {
  return alignments.map((alignment) => {
    const config: DelimiterCell = {
      alignment: alignment,
    };
    return config;
  });
}
