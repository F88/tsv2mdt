import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ColumnAlignmentControls } from './ColumnAlignmentControls.js';
import '../../../test/helpers/i18n-for-tests.js';

describe('ColumnAlignmentControls', () => {
  const mockOnAlignmentChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when no column names provided', () => {
    const { container } = render(
      <ColumnAlignmentControls
        columnNames={[]}
        alignments={[]}
        onAlignmentChange={mockOnAlignmentChange}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders alignment controls for each column', () => {
    render(
      <ColumnAlignmentControls
        columnNames={['Name', 'Age', 'Job', 'Location']}
        alignments={['left', 'right', 'center', undefined]}
        onAlignmentChange={mockOnAlignmentChange}
      />,
    );
    screen.debug();
    expect(screen.getByText('Column Alignment')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Job')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
  });
});
