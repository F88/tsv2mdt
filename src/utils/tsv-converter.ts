/**
 * TSV to Markdown table converter utilities
 */

import type { MarkdownTable } from 'x2md';

/**
 * Escapes HTML special characters
 * @param text - The text to escape
 * @returns Escaped HTML string
 */
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
}

/**
 * Converts Markdown table to HTML
 *
 * @param markdownTable - The Markdown table object
 * @returns HTML table string
 */
export function convertMarkdownTableToHtml(
  markdownTable: MarkdownTable,
): string {
  let html = '<table>\n';

  // Add header
  html += '  <thead>\n    <tr>\n';
  markdownTable.header.forEach((cell) => {
    html += `      <th>${escapeHtml(cell)}</th>\n`;
  });
  html += '    </tr>\n  </thead>\n';

  // Add body
  html += '  <tbody>\n';
  markdownTable.data.forEach((row) => {
    html += '    <tr>\n';
    row.forEach((cell, index) => {
      const alignment = markdownTable.delimiter[index]?.alignment ?? 'left';
      html += `      <td style="text-align: ${alignment}">${escapeHtml(cell)}</td>\n`;
    });
    html += '    </tr>\n';
  });
  html += '  </tbody>\n';

  html += '</table>';

  return html;
}
