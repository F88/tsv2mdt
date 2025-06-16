import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppBar } from './AppBar';
import { LanguageContextProvider } from '../../contexts/LanguageContextProvider';
import { ThemeContextProvider } from '../../contexts/ThemeContextProvider';
import { MuiThemeProvider } from '../../contexts/MuiThemeProvider';

const meta = {
  title: 'AppBar',
  component: AppBar,
  parameters: {
    layout: 'padded',
    // layout: 'fullscreen',
    // layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  decorators: (Story) => (
    <LanguageContextProvider>
      <ThemeContextProvider>
        <MuiThemeProvider>
          <Story />
        </MuiThemeProvider>
      </ThemeContextProvider>
    </LanguageContextProvider>
  ),
};
