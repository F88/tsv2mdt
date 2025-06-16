import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import { Actions } from './Actions';
import i18n from '../../test/helpers/i18n-for-tests';
import userEvent from '@testing-library/user-event';

describe('Actions', () => {
  const mockOnLoadSample = vi.fn();
  const mockOnClearAll = vi.fn();

  const renderActions = () => {
    return render(
      <I18nextProvider i18n={i18n}>
        <Actions onLoadSample={mockOnLoadSample} onClearAll={mockOnClearAll} />
      </I18nextProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders load sample button with correct text and icon', () => {
    renderActions();

    const loadSampleButton = screen.getByRole('button', {
      name: /Load Sample/i,
    });
    expect(loadSampleButton).toBeInTheDocument();
    expect(loadSampleButton).toHaveAttribute('type', 'button');

    // snapshot testing
    expect(loadSampleButton).toMatchSnapshot();
  });

  it('renders clear all button with correct text and icon', () => {
    renderActions();

    const clearAllButton = screen.getByRole('button', { name: /Clear All/i });
    expect(clearAllButton).toBeInTheDocument();
    expect(clearAllButton).toHaveAttribute('type', 'button');

    // snapshot testing
    expect(clearAllButton).toMatchSnapshot();
  });

  it('calls onLoadSample when load sample button is clicked', async () => {
    const user = userEvent.setup();
    renderActions();

    const loadSampleButton = screen.getByRole('button', {
      name: /Load Sample/i,
    });
    await user.click(loadSampleButton);

    expect(mockOnLoadSample).toHaveBeenCalledTimes(1);
  });

  it('calls onClearAll when clear all button is clicked', async () => {
    const user = userEvent.setup();
    renderActions();

    const clearAllButton = screen.getByRole('button', { name: /Clear All/i });
    await user.click(clearAllButton);

    expect(mockOnClearAll).toHaveBeenCalledTimes(1);
  });

  it('renders buttons with correct styling properties', () => {
    renderActions();

    const loadSampleButton = screen.getByRole('button', {
      name: /load sample/i,
    });
    const clearAllButton = screen.getByRole('button', { name: /Clear All/i });

    expect(loadSampleButton).toHaveClass('MuiButton-contained');
    expect(clearAllButton).toHaveClass('MuiButton-outlined');

    // snapshot testing
    expect(loadSampleButton).toMatchSnapshot();
    expect(clearAllButton).toMatchSnapshot();
  });
});
