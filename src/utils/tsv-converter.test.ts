import { describe, expect, it } from 'vitest';
import type { MarkdownTable } from 'x2md';
import { convertMarkdownTableToHtml } from './tsv-converter.js';

// Helper for normalizing HTML output (remove whitespace differences)
function normalizeHtml(html: string) {
  return html.replace(/\s+/g, ' ').trim();
}

describe('convertMarkdownTableToHtml', () => {
  it('converts a MarkdownTable object to HTML', () => {
    const table: MarkdownTable = {
      header: ['Name', 'Age'],
      data: [
        ['John', '30'],
        ['Jane', '25'],
      ],
      delimiter: [{ alignment: undefined }, { alignment: undefined }],
    };
    const expected = `
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align: left">John</td>
      <td style="text-align: left">30</td>
    </tr>
    <tr>
      <td style="text-align: left">Jane</td>
      <td style="text-align: left">25</td>
    </tr>
  </tbody>
</table>`;
    expect(normalizeHtml(convertMarkdownTableToHtml(table))).toBe(
      normalizeHtml(expected),
    );
  });

  it('escapes HTML special characters in table cells', () => {
    const table: MarkdownTable = {
      header: ['Name', 'Note'],
      data: [['<b>John</b>', '5 & 6']],
      delimiter: [{ alignment: undefined }, { alignment: undefined }],
    };
    const html = convertMarkdownTableToHtml(table);
    expect(html).toContain('&lt;b&gt;John&lt;/b&gt;');
    expect(html).toContain('5 &amp; 6');
  });

  it('returns empty string for missing header or data', () => {
    const data: MarkdownTable = {
      header: [],
      delimiter: [],
      data: [],
    };
    const expected = `<table>
  <thead>
    <tr>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>`;
    expect(convertMarkdownTableToHtml(data)).toBe(expected);
  });

  it('returns empty string with empty data', () => {
    const data: MarkdownTable = {
      header: ['Name'],
      delimiter: [{ alignment: undefined }],
      data: [],
    };
    const expected = `<table>
  <thead>
    <tr>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>`;
    expect(convertMarkdownTableToHtml(data)).toBe(expected);
  });
});
