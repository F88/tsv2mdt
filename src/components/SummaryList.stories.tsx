import type { Meta, StoryObj } from '@storybook/react-vite';
import { SummaryList } from './SummaryList';

const meta = {
  title: 'Summary/SummaryList',
  component: SummaryList,
  parameters: {
    // layout: 'padded',
    layout: 'fullscreen',
    // layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SummaryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Summary: Story = {
  args: {
    title: 'Summary',
    items: [
      { label: 'row(s)', value: '1' },
      { label: 'Column(s)', value: '1,234' },
      { label: 'Size', value: '789 KB' },
    ],
  },
};
