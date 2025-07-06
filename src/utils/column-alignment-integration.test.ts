import { describe, expect, it } from 'vitest';
import { toTable } from 'x2md';
import type { MarkdownTable } from 'x2md';
import { createDelimiterFromAlignments } from './table-utils.js';

describe('Column Alignment Integration', () => {
  it('generates markdown table with left alignment', () => {
    const tableData: MarkdownTable = {
      header: ['Name', 'Age', 'Job'],
      data: [
        ['John', '30', 'Engineer'],
        ['Jane', '25', 'Designer'],
      ],
      delimiter: [{ alignment: undefined }, { alignment: undefined }, { alignment: undefined }],
    };

    const customDelimiter = createDelimiterFromAlignments(['left', 'left', 'left']);
    const markdown = toTable(tableData, customDelimiter);

    expect(markdown).toContain('| :--- | :--- | :--- |');
  });

  it('generates markdown table with center alignment', () => {
    const tableData: MarkdownTable = {
      header: ['Name', 'Age', 'Job'],
      data: [
        ['John', '30', 'Engineer'],
        ['Jane', '25', 'Designer'],
      ],
      delimiter: [{ alignment: undefined }, { alignment: undefined }, { alignment: undefined }],
    };

    const customDelimiter = createDelimiterFromAlignments(['center', 'center', 'center']);
    const markdown = toTable(tableData, customDelimiter);

    expect(markdown).toContain('| :---: | :---: | :---: |');
  });

  it('generates markdown table with right alignment', () => {
    const tableData: MarkdownTable = {
      header: ['Name', 'Age', 'Job'],
      data: [
        ['John', '30', 'Engineer'],
        ['Jane', '25', 'Designer'],
      ],
      delimiter: [{ alignment: undefined }, { alignment: undefined }, { alignment: undefined }],
    };

    const customDelimiter = createDelimiterFromAlignments(['right', 'right', 'right']);
    const markdown = toTable(tableData, customDelimiter);

    expect(markdown).toContain('| ---: | ---: | ---: |');
  });

  it('generates markdown table with mixed alignments', () => {
    const tableData: MarkdownTable = {
      header: ['Name', 'Age', 'Job'],
      data: [
        ['John', '30', 'Engineer'],
        ['Jane', '25', 'Designer'],
      ],
      delimiter: [{ alignment: undefined }, { alignment: undefined }, { alignment: undefined }],
    };

    const customDelimiter = createDelimiterFromAlignments(['left', 'center', 'right']);
    const markdown = toTable(tableData, customDelimiter);

    expect(markdown).toContain('| :--- | :---: | ---: |');
  });

  it('generates markdown table with default alignment when undefined', () => {
    const tableData: MarkdownTable = {
      header: ['Name', 'Age', 'Job'],
      data: [
        ['John', '30', 'Engineer'],
        ['Jane', '25', 'Designer'],
      ],
      delimiter: [{ alignment: undefined }, { alignment: undefined }, { alignment: undefined }],
    };

    const customDelimiter = createDelimiterFromAlignments([undefined, undefined, undefined]);
    const markdown = toTable(tableData, customDelimiter);

    expect(markdown).toContain('| --- | --- | --- |');
  });
});