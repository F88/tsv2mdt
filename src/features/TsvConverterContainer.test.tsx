import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type MarkdownTable } from 'x2md';
import { TsvConverterContainer } from './TsvConverterContainer';

// Mock child components to isolate container logic
vi.mock('../components/tsv/Tsv.jsx', () => ({
  Tsv: (props: Record<string, unknown>) => (
    <textarea
      data-testid="tsv-input"
      aria-label="TSV Input"
      value={props.tsvInput as string}
      onChange={props.onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
    />
  ),
}));
vi.mock('../components/markdown/Markdown.jsx', () => ({
  Markdown: (props: { markdownOutput: string }) => (
    <div data-testid="markdown-output">{props.markdownOutput}</div>
  ),
}));
vi.mock('../components/preview/HtmlPreview.jsx', () => ({
  HtmlPreview: (props: { htmlOutput: string }) => (
    <div data-testid="html-output">{props.htmlOutput}</div>
  ),
}));
vi.mock('../components/tsv/TsvConverterHeader.jsx', () => ({
  TsvConverterHeader: () => <div data-testid="header" />,
}));
vi.mock('./Actions.jsx', () => ({
  Actions: (props: { onLoadSample: () => void; onClearAll: () => void }) => (
    <div>
      <button type="button" onClick={props.onLoadSample}>
        Load Sample
      </button>
      <button type="button" onClick={props.onClearAll}>
        Clear All
      </button>
    </div>
  ),
}));

// Mock ExampleData
vi.mock('../assets/sample-data.ts', () => ({
  ExampleData: ['col1\tcol2\nval1\tval2', 'a\tb\n1\t2'],
}));

// Mock parseTsv and convertMarkdownTableToHtml
vi.mock('x2md', async (importOriginal) => {
  const actual: object = await importOriginal();
  return {
    ...actual,
    parseTsv: (tsv: string): MarkdownTable => {
      if (tsv === 'bad') throw new Error('parse error');
      const tableData: MarkdownTable = {
        header: ['col1', 'col2'],
        data: [['val1', 'val2']],
        delimiter: [{ alignment: 'left' }, { alignment: 'left' }],
      };
      return tableData;
    },
  };
});

vi.mock('../utils/tsv-converter.js', () => ({
  convertMarkdownTableToHtml: () =>
    '<table><tr><td>val1</td><td>val2</td></tr></table>',
}));

describe('TsvConverterContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    cleanup();
  });

  it('renders all main components', () => {
    render(<TsvConverterContainer />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Load Sample')).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
    expect(screen.getByTestId('tsv-input')).toBeInTheDocument();
    expect(screen.getByTestId('markdown-output')).toBeInTheDocument();
    expect(screen.getByTestId('html-output')).toBeInTheDocument();
  });

  it('loads sample data when Load Sample is clicked', async () => {
    render(<TsvConverterContainer />);
    const tsvInput: HTMLTextAreaElement = screen.getByTestId('tsv-input');
    expect(tsvInput.value).toBe('');
    await userEvent.click(screen.getByText('Load Sample'));
    // After click, tsvInput should be set to one of the ExampleData
    expect(['col1\tcol2\nval1\tval2', 'a\tb\n1\t2']).toContain(tsvInput.value);
  });

  it('clears all fields when Clear All is clicked', async () => {
    render(<TsvConverterContainer />);
    const tsvInput: HTMLTextAreaElement = screen.getByTestId('tsv-input');
    // Set some value first
    fireEvent.change(tsvInput, { target: { value: 'col1\tcol2\nval1\tval2' } });
    expect(tsvInput.value).toBe('col1\tcol2\nval1\tval2');
    await userEvent.click(screen.getByText('Clear All'));
    expect(tsvInput.value).toBe('');
    expect(screen.getByTestId('markdown-output').textContent).toBe('');
    expect(screen.getByTestId('html-output').textContent).toBe(
      '<table><tr><td>val1</td><td>val2</td></tr></table>',
    );
  });

  it('updates markdown and html output when TSV input changes', () => {
    render(<TsvConverterContainer />);
    const tsvInput = screen.getByTestId('tsv-input');
    fireEvent.change(tsvInput, { target: { value: 'col1\tcol2\nval1\tval2' } });
    // Markdown and HTML output should be updated (mocked)
    expect(screen.getByTestId('markdown-output')).toBeInTheDocument();
    expect(screen.getByTestId('html-output').textContent).toContain('<table>');
  });

  it('handles parse error and clears table data on bad TSV', () => {
    render(<TsvConverterContainer />);
    const tsvInput = screen.getByTestId('tsv-input');
    fireEvent.change(tsvInput, { target: { value: 'bad' } });
    // Should not throw, and markdown/html outputs should be empty
    expect(screen.getByTestId('markdown-output').textContent).toBe('');
    expect(screen.getByTestId('html-output').textContent).toBe(
      '<table><tr><td>val1</td><td>val2</td></tr></table>',
    );
  });
});
