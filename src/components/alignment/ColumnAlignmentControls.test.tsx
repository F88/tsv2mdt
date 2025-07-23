import { render, screen, fireEvent } from '@testing-library/react';
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
        columnNames={['Name', 'Age', 'Job']}
        alignments={['left', undefined, 'right']}
        onAlignmentChange={mockOnAlignmentChange}
      />,
    );

    expect(screen.getByText('Column Alignment')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Job')).toBeInTheDocument();
  });

  it('calls onAlignmentChange when alignment is changed', () => {
    render(
      <ColumnAlignmentControls
        columnNames={['Name', 'Age']}
        alignments={[undefined, undefined]}
        onAlignmentChange={mockOnAlignmentChange}
      />,
    );

    const firstSelect = screen.getByLabelText('Name');
    fireEvent.mouseDown(firstSelect);

    const leftOption = screen.getByText('Left');
    fireEvent.click(leftOption);

    expect(mockOnAlignmentChange).toHaveBeenCalledWith(0, 'left');
  });

  it('displays current alignment values correctly', () => {
    render(
      <ColumnAlignmentControls
        columnNames={['Name', 'Age']}
        alignments={['left', 'center']}
        onAlignmentChange={mockOnAlignmentChange}
      />,
    );

    const nameSelect = screen.getByDisplayValue('left');
    const ageSelect = screen.getByDisplayValue('center');

    expect(nameSelect).toBeInTheDocument();
    expect(ageSelect).toBeInTheDocument();
  });
});
