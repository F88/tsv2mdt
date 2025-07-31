import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type MarkdownTable } from 'x2md';
import { TsvConverterContainer } from './TsvConverterContainer';
import * as tsvConverter from '../utils/tsv-converter.js';
import * as firebaseAnalytics from 'firebase/analytics';

// Mock child components to isolate container logic
vi.mock('../utils/tsv-converter.js');

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
  Markdown: (props: {
    markdownOutput: string;
    tableData: MarkdownTable;
    customColumnAlignments: unknown[];
    handleUpdateMarkdownTable: (markdown: string) => void;
    onAlignmentChange: (index: number, alignment: string) => void;
  }) => <div data-testid="markdown-output">{props.markdownOutput}</div>,
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
      if (tsv === '') {
        return { header: [], data: [], delimiter: [] };
      }
      const tableData: MarkdownTable = {
        header: ['col1', 'col2'],
        data: [['val1', 'val2']],
        delimiter: [{ alignment: 'left' }, { alignment: 'left' }],
      };
      return tableData;
    },
  };
});

const convertedHtml =
  '<table><tr><th>col1</th><th>col2</th></tr><tr><td>val1</td><td>val2</td></tr></table>';
const emptyHtml = '<table></table>';

vi.mock('../utils/tsv-converter.js', () => ({
  convertMarkdownTableToHtml: vi.fn((markdownTable: MarkdownTable) => {
    if (markdownTable.header.length > 0) {
      return convertedHtml;
    } else {
      return emptyHtml;
    }
  }),
}));

// Mock Firebase Analytics
vi.mock('firebase/analytics', () => ({
  logEvent: vi.fn(),
}));

vi.mock('../utils/firebase-utils.ts', () => ({
  analytics: {},
}));

describe('TsvConverterContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    cleanup();
  });

  // Tests for initial display content
  describe('initial render', () => {
    it('renders all main UI components', () => {
      render(<TsvConverterContainer />);

      expect(screen.getByTestId('header')).toBeInTheDocument();

      expect(screen.getByText('Load Sample')).toBeInTheDocument();
      expect(screen.getByText('Clear All')).toBeInTheDocument();

      expect(screen.getByTestId('tsv-input')).toBeInTheDocument();
      expect(screen.getByTestId('markdown-output')).toBeInTheDocument();
      expect(screen.getByTestId('html-output')).toBeInTheDocument();

      expect(screen.getByTestId('tsv-input')).toHaveValue('');
      expect(screen.getByTestId('markdown-output')).toHaveTextContent('');
      expect(screen.getByTestId('html-output')).toHaveTextContent(emptyHtml);
    });
  });

  describe('Load Sample', () => {
    it('loads sample data and logs analytics event', async () => {
      render(<TsvConverterContainer />);
      const tsvInput: HTMLTextAreaElement = screen.getByTestId('tsv-input');
      expect(tsvInput.value).toBe('');
      await userEvent.click(screen.getByText('Load Sample'));
      expect(['col1\tcol2\nval1\tval2', 'a\tb\n1\t2']).toContain(
        tsvInput.value,
      );
      expect(vi.mocked(firebaseAnalytics.logEvent)).toHaveBeenCalledWith(
        expect.anything(),
        'load_sample',
        {
          content_type: 'event',
          item_id: 'load-example',
        },
      );
    });

    it('cycles through different sample data on multiple clicks', async () => {
      render(<TsvConverterContainer />);
      const tsvInput: HTMLTextAreaElement = screen.getByTestId('tsv-input');
      // Click multiple times and check that the value changes
      await userEvent.click(screen.getByText('Load Sample'));
      const firstValue = tsvInput.value;
      await userEvent.click(screen.getByText('Load Sample'));
      const secondValue = tsvInput.value;
      // If only two samples, values should alternate
      expect(['col1\tcol2\nval1\tval2', 'a\tb\n1\t2']).toContain(firstValue);
      expect(['col1\tcol2\nval1\tval2', 'a\tb\n1\t2']).toContain(secondValue);
      // Should not always be the same
      expect(firstValue).not.toBe(secondValue);
    });
  });

  describe('Clear All', () => {
    it('clears all fields and logs analytics event', async () => {
      render(<TsvConverterContainer />);
      const tsvInput: HTMLTextAreaElement = screen.getByTestId('tsv-input');

      // Set some value first
      fireEvent.change(tsvInput, {
        target: { value: 'col1\tcol2\nval1\tval2' },
      });
      expect(tsvInput.value).toBe('col1\tcol2\nval1\tval2');

      await userEvent.click(screen.getByText('Clear All'));

      expect(tsvInput.value).toBe('');
      expect(screen.getByTestId('markdown-output')).toHaveTextContent('');
      expect(vi.mocked(firebaseAnalytics.logEvent)).toHaveBeenCalledWith(
        expect.anything(),
        'clear_data',
        {
          content_type: 'event',
          item_id: 'clear-all',
        },
      );
    });
  });

  describe('When the input data is updated', () => {
    it('convertMarkdownTableToHtml is called with correct arguments', () => {
      const mocked = vi.mocked(tsvConverter);
      render(<TsvConverterContainer />);
      const tsvInput = screen.getByTestId('tsv-input');
      fireEvent.change(tsvInput, {
        target: { value: 'col1\tcol2\nval1\tval2' },
      });
      expect(mocked.convertMarkdownTableToHtml).toHaveBeenCalledWith({
        header: ['col1', 'col2'],
        data: [['val1', 'val2']],
        delimiter: [{ alignment: 'left' }, { alignment: 'left' }],
      });
    });

    it('markdown and html outputs are updated correctly', () => {
      render(<TsvConverterContainer />);

      expect(screen.getByTestId('html-output')).toHaveTextContent(emptyHtml);

      const tsvInput = screen.getByTestId('tsv-input');
      fireEvent.change(tsvInput, {
        target: { value: 'col1\tcol2\nval1\tval2' },
      });

      expect(screen.getByTestId('html-output')).toHaveTextContent(
        convertedHtml,
      );
    });

    it('resets outputs when TSV input is cleared', () => {
      render(<TsvConverterContainer />);
      const tsvInput = screen.getByTestId('tsv-input');
      // First set valid data
      fireEvent.change(tsvInput, {
        target: { value: 'col1\tcol2\nval1\tval2' },
      });
      expect(screen.getByTestId('html-output')).toHaveTextContent(
        convertedHtml,
      );
      // Then clear it
      fireEvent.change(tsvInput, { target: { value: '' } });
      expect(screen.getByTestId('html-output')).toHaveTextContent(emptyHtml);
    });
  });

  describe('Error handling', () => {
    it('handles parse error and clears table data on invalid TSV', () => {
      render(<TsvConverterContainer />);
      const tsvInput = screen.getByTestId('tsv-input');
      fireEvent.change(tsvInput, { target: { value: 'bad' } });
      expect(screen.getByTestId('markdown-output')).toHaveTextContent('');
      expect(screen.getByTestId('html-output')).toHaveTextContent(emptyHtml);
    });

    it('does not crash when HTML conversion fails', () => {
      const mocked = vi.mocked(tsvConverter);
      render(<TsvConverterContainer />);

      // Mock to throw error and then reset to default behavior
      mocked.convertMarkdownTableToHtml.mockImplementationOnce(() => {
        throw new Error('Conversion error');
      });

      const tsvInput = screen.getByTestId('tsv-input');

      // This should not crash the component
      expect(() => {
        fireEvent.change(tsvInput, {
          target: { value: 'col1\tcol2\nval1\tval2' },
        });
      }).not.toThrow();

      // Should have empty HTML output on error since the component catches the error
      expect(screen.getByTestId('html-output')).toBeEmptyDOMElement();
    });
  });

  describe('User interaction flows', () => {
    it('handles load sample -> edit -> clear all flow', async () => {
      render(<TsvConverterContainer />);
      const tsvInput: HTMLTextAreaElement = screen.getByTestId('tsv-input');

      // Load sample
      await userEvent.click(screen.getByText('Load Sample'));
      expect(tsvInput.value).not.toBe('');

      // Edit the input
      fireEvent.change(tsvInput, {
        target: { value: 'edited\tdata\ntest\tvalue' },
      });
      expect(tsvInput.value).toBe('edited\tdata\ntest\tvalue');

      // Clear all
      await userEvent.click(screen.getByText('Clear All'));
      expect(tsvInput.value).toBe('');
      expect(screen.getByTestId('markdown-output')).toHaveTextContent('');
    });

    it('does not throw when clicking Load Sample or Clear All repeatedly', async () => {
      render(<TsvConverterContainer />);
      for (let i = 0; i < 5; i++) {
        await userEvent.click(screen.getByText('Load Sample'));
        await userEvent.click(screen.getByText('Clear All'));
      }
      const tsvInput: HTMLTextAreaElement = screen.getByTestId('tsv-input');
      expect(tsvInput.value).toBe('');
    });
  });

  describe('Analytics integration', () => {
    it('logs load sample events with correct parameters', async () => {
      render(<TsvConverterContainer />);
      await userEvent.click(screen.getByText('Load Sample'));

      expect(vi.mocked(firebaseAnalytics.logEvent)).toHaveBeenCalledWith(
        expect.anything(),
        'load_sample',
        {
          content_type: 'event',
          item_id: 'load-example',
        },
      );
    });

    it('logs clear all events with correct parameters', async () => {
      render(<TsvConverterContainer />);
      await userEvent.click(screen.getByText('Clear All'));

      expect(vi.mocked(firebaseAnalytics.logEvent)).toHaveBeenCalledWith(
        expect.anything(),
        'clear_data',
        {
          content_type: 'event',
          item_id: 'clear-all',
        },
      );
    });
  });
});
