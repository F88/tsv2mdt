import type { Meta, StoryObj } from '@storybook/react-vite';

import { ColumnAlignmentControls } from './ColumnAlignmentControls';

const meta = {
  title: 'ColumnAlignmentControls',
  component: ColumnAlignmentControls,
  parameters: {
    // layout: 'padded',
    layout: 'fullscreen',
    // layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColumnAlignmentControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    columnNames: ['Name', 'Age', 'Job', 'Location'],
    alignments: ['left', 'center', 'right', undefined],
    onAlignmentChange: (index, alignment) => {
      console.log(
        `Column ${String(index)} alignment changed to ${String(alignment)}`,
      );
    },
  },
};
