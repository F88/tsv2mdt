import { cleanup, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { describe, it, expect, afterEach } from 'vitest';
import { HtmlPreview } from './HtmlPreview';
import i18n from '../../../test/helpers/i18n-for-tests';

// Helper HTML for tests
const htmlTable = `
<table>
  <thead>
    <tr><th>Name</th><th>Age</th></tr>
  </thead>
  <tbody>
    <tr><td>John</td><td>30</td></tr>
    <tr><td>Jane</td><td>25</td></tr>
  </tbody>
</table>`;

describe('HtmlPreview', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the preview title', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HtmlPreview htmlOutput={htmlTable} />
      </I18nextProvider>,
    );
    expect(screen.getByText('HTML Preview')).toBeInTheDocument();
  });

  it('renders sanitized HTML output', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HtmlPreview htmlOutput={htmlTable} />
      </I18nextProvider>,
    );
    // Table header and cell content should be present
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('sanitizes dangerous HTML', () => {
    const dangerousHtml =
      '<img src=x onerror=alert(1)><table><tr><td>Safe</td></tr></table>';
    render(
      <I18nextProvider i18n={i18n}>
        <HtmlPreview htmlOutput={dangerousHtml} />
      </I18nextProvider>,
    );
    // The image should not be rendered (sanitized out)
    expect(screen.queryByRole('img')).toHaveAttribute('src');
    expect(screen.queryByRole('img')).not.toHaveAttribute('onerror');
    expect(screen.getByText('Safe')).toBeInTheDocument();
  });

  it('renders empty output gracefully', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <HtmlPreview htmlOutput="" />
      </I18nextProvider>,
    );
    // Should still render the title
    expect(screen.getByText('HTML Preview')).toBeInTheDocument();
  });
});
