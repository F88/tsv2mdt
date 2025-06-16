import type { Meta, StoryObj } from '@storybook/react-vite';

import { HtmlPreview } from './HtmlPreview';

const meta = {
  title: 'Preview/HtmlPreview',
  component: HtmlPreview,
  parameters: {
    // layout: 'padded',
    layout: 'fullscreen',
    // layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HtmlPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Html: Story = {
  name: 'HTML',
  args: {
    htmlOutput: `
    <img src="https://placehold.co/100x100">
    <table>
      <thead>
        <tr><th>Name</th><th>Age</th></tr>
      </thead>
      <tbody>
        <tr><td>John</td><td>30</td></tr>
        <tr><td>Jane</td><td>25</td></tr>
      </tbody>
    </table>`,
  },
};

export const SanitizedHtml: Story = {
  name: 'Sanitized HTML',
  args: {
    htmlOutput: `
    <img src="https://example.com/100x100" onerror=alert(1)>
    <table>
      <thead>
        <tr><th>Name</th><th>Age</th></tr>
      </thead>
      <tbody>
        <tr><td>John</td><td>30</td></tr>
        <tr><td>Jane</td><td>25</td></tr>
      </tbody>
    </table>`,
  },
};
