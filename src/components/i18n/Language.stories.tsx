import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageContextProvider } from '../../contexts/LanguageContextProvider';
// import { ThemeContextProvider } from '../../contexts/ThemeContextProvider';
// import { MuiThemeProvider } from '../../contexts/MuiThemeProvider';
import { Language } from './Language';
import { LanguageContext } from '../../contexts/language-context';

const meta = {
  title: 'Language',
  component: Language,
  parameters: {
    layout: 'padded',
    // layout: 'fullscreen',
    // layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Language>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    direction: 'row',
  },
  decorators: (Story) => (
    <LanguageContext
      value={{
        language: 'fr',
        nextLanguage: () => 'ja',
        changeLanguage: (language: string) => {
          console.log(`Language changed to ${language}`);
        },
        setNextLanguage() {
          console.log('Next language set');
        },
      }}
    >
      {/* <ThemeContextProvider> */}
      {/* <MuiThemeProvider> */}
      <Story />
      {/* </MuiThemeProvider> */}
      {/* </ThemeContextProvider> */}
    </LanguageContext>
  ),
};

export const Vertical: Story = {
  args: {
    direction: 'column',
  },
  decorators: (Story) => (
    <LanguageContextProvider>
      {/* <ThemeContextProvider> */}
      {/* <MuiThemeProvider> */}
      <Story />
      {/* </MuiThemeProvider> */}
      {/* </ThemeContextProvider> */}
    </LanguageContextProvider>
  ),
};
